README.md
```python
class Solution:  
    def EulerPath(self, tickets: List[List[str]]) -> List[str]:  
        graph = defaultdict(list)  
        for a, b in ticket:  
            graph[a].append(b)  
          
        ret = []  
        def dfs(cur):  
            while graph[cur]:  
                nxt = graph[cur].pop()  
                dfs(nxt)  
            ret.append(cur)  
        dfs('JFK')  
        return ret[::-1]
```

