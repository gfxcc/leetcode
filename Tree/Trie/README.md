README.md
> Typical implementation  
```python  
class TreeNode:  
    def __init__(self):  
        self.word = None  
        self.next = defaultdict(TreeNode)  
          
class Trie:  

    def __init__(self):  
        self.root = TreeNode()  
          
    def insert(self, word: str) -> None:  
        cur = self.root  
        for c in word:  
            cur = cur.next[c]  
        cur.word = word  
          

    def search(self, word: str) -> bool:  
        cur = self.root  
        for c in word:  
            if c not in cur.next: return False  
            cur = cur.next[c]  
        return cur.word  
```  

> Note  

1. Consider build trie in reversed order if the characters are given in reversed order.

