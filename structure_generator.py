#! /usr/bin/env python3.8
from __future__ import annotations

import os
import logging
from typing import *
from enum import Enum


OUTPUT_PATH = '.'
SOURCE_FILE = './Fundamental-Algorithm-Knowledge.md'


class File:
    def __init__(self, name: str):
        self.name = name
        self.content = []
    
    def write(self, path):
        filename = os.path.join(path, self.name)
        logging.info(f'creating file {filename}')
        with open(filename, 'w') as f:
            f.writelines(self.content)
        logging.info('done')


class Section:
    def __init__(self, name, level):
        self.level = level
        self.name = name
        self.subsections = []
        self.files = []
        self.readme = File('README.md')
    
    def __str__(self):
        ret = ['  ' * self.level + f'- {self.name}']
        for subsection in self.subsections:
            ret.append(str(subsection))
        return '\n'.join(ret)
    
    def write_to_disk(self, path: str):
        cur_path = os.path.join(path, self.name)
        logging.info(f'creating dir {cur_path}')
        os.mkdir(cur_path)
        logging.info('done')

        self.readme.write(cur_path)

        for file in self.files:
            file.write(cur_path)

        for subsection in self.subsections:
            subsection.write_to_disk(cur_path)


class Loader:
    @staticmethod
    def readline(line: str) -> Union[Section, File, str]:
        if line.startswith('#'):
            return Section(line[line.index(' ')+1:].strip().replace(' ', '-'), line.count('#'))
        elif line.startswith('- ') and not line.startswith('- ['):
            return File(line[line.index(' ')+1:].strip().replace(' ', '-')+'.md')
        else:
            return line


if __name__ == "__main__":
    with open(SOURCE_FILE, 'r') as f:
        content = f.readlines()
    
    stack = []
    
    for cur in (Loader.readline(line) for line in content):
        if isinstance(cur, Section):
            while stack and (not isinstance(stack[-1], Section) or stack[-1].level >= cur.level):
                stack.pop()
            else:
                if stack:
                    stack[-1].subsections.append(cur)
            stack.append(cur)
            stack.append(cur.readme)
            
        elif isinstance(cur, File):
            while stack and not isinstance(stack[-1], Section):
                stack.pop()
            else:
                if stack:
                    stack[-1].files.append(cur)
            stack.append(cur)

        elif isinstance(cur, str):
            assert stack, 'Encouter content while stack is empyt'
            if isinstance(stack[-1], File):
                stack[-1].content.append(cur)
            else:
                raise RuntimeError('...')

        else:
            raise RuntimeError('...')
    
    root_section = stack[0]
    root_section.write_to_disk(os.path.abspath('.'))