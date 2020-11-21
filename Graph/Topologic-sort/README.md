README.md
```python  
def topo_sort(n: int, edges: List[List[int]]):  
    '''  
    Args:  
      n: graph contains vertex 0, 1, 2, ..... n-1  
      edges: [[u, v], [u, v], ....]  
    '''  
    succ, pred = defaultdict(set), defaultdict(set)  
    for u, v in edges:  
        succ[u].add(v)  
        pred[v].add(u)  
    ret, q = [], [u for u in range(n) if len(pred[u]) == 0]  
    while q:  
        u = q.pop()  
        ret.append(u)  

        for v in succ[u]:  
            pred[v].remove(u)  
            if not pred[v]:  
                q.append(v)  
      
    if len(ret) != n+1:  
        return []  
    return ret  
```

