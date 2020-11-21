#! /usr/bin/env python3.9
from __future__ import annotations

import os
import logging
from typing import *
from enum import Enum


OUTPUT_PATH = '..'
SOURCE_FILE = './Fundamental-Algorithm-Knowledge.md'


class File:
    def __init__(self, name: str):
        self.name = name
        self.content = []
    
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name: str):
        self._name = name.replace('-', ' ')
    
    def write(self, path):
        def filename_to_disk(filename):
            return filename.replace(' ', '_')

        self._normalize_code_block()

        filename = os.path.join(path, filename_to_disk(self.name))
        logging.info(f'creating file {filename}')
        with open(filename, 'w') as f:
            f.writelines([self.name] + self.content)
        logging.info('done')
    
    def _normalize_code_block(self):
        in_block = False
        indent = 0

        for i, line in enumerate(self.content):
            if in_block:
                self.content[i] = self.content[i][indent:]
            if '```' in line:
                indent = line.index('`')
                in_block ^= True
                if in_block:
                    self.content[i] = self.content[i][indent:]
 

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
        try:
            os.mkdir(cur_path)
        except FileExistsError:
            pass
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
    [sub_sec.write_to_disk(OUTPUT_PATH) for sub_sec in root_section.subsections]
