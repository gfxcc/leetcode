README.md
> Implementation  

Tips:   
Create uf as list can be faster but dictionary can tell us whether an element is registered in the union-find which is useful in some case.  
```python  
uf = {}  
def find(x):  
    uf.setdefault(x, x)  
    if x != uf[x]:  
        uf[x] = find(uf[x])  
    return uf[x]  
def union(x, y):  
    uf[find(x)] = uf[find(y)]  
```  

> Usage  

>> Count the size of each subcomponent in a graph.   
1. Do a typical union find to bucket each vertex  
2. Traverse all vertex and increment the counter of subset it belong to (aka return value of find())  

>> Find cycle in a graph  
1. Do a typical union find  
2. A cycle is found when we encounter an edge (u, v) where find(u) == find(v)  

