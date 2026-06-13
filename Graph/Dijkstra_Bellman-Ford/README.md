README.md

## [Graph-Dijkstra](https://gfxcc.github.io/2019/06/01/Graph-Dijkstra/)

Use Dijkstra when all edge weights are non-negative. If the graph can contain
negative edge weights, use Bellman-Ford instead.

```python
def shortest_path(edges: List[List[int]], origin: int, dest: int) -> List[int]:
    """Return one shortest path from origin to dest, or [] if unreachable."""
    graph = defaultdict(dict)
    # 1. Build graph
    # Keep minimum weight edge if multiple edges exist between same vertices
    for u, v, w in edges:
        graph[u][v] = min(graph[u].get(v, math.inf), w)

    # 2. Release edges
    heap = [(0, origin)]
    dist, prev = {origin: 0}, {origin: None}
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue

        for v, w in graph[u].items():
            alt_dist = d + w
            if v not in dist or alt_dist < dist[v]:
                dist[v] = alt_dist
                prev[v] = u
                heapq.heappush(heap, (alt_dist, v))

    # 3. Build path
    if dest not in prev:
        return []
    path, curr = [], dest
    while curr is not None:
        path.append(curr)
        curr = prev[curr]
    return path[::-1]
```

**Note:** For optimization, you can add an early termination condition (`if u == dest: break`) when you only need the shortest path to a specific destination rather than computing shortest paths to all reachable nodes.

Time: `O(E log V)`, Space: `O(V + E)`.

## [Bellman-Ford](https://gfxcc.github.io/2019/06/01/Graph-Bellman-Ford/)


```python
def shortest_path(edges: List[List[int]], origin: int, dest: int) -> List[int]:
    vertexs = {u for u, v, _ in edges} | { v for u, v, _ in edges}

    prev, dist = {}, defaultdict(lambda: math.inf)
    dist[origin] = 0
    # 1. relax edges
    for _ in range(len(vertexs) - 1):
        updated = False
        for u, v, w in edges:
            if w + dist[u] < dist[v]:
                prev[v] = u
                dist[v] = w + dist[u]
                updated = True
        if not updated:
            break # Quick exit

    # 2. detect negative cycle
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return [] # negative cycle
    
    # 3. build path
    if dist[dest] == math.inf:
        return []
    path = []
    curr = dest
    while curr != origin:
        path.append(curr)
        curr = prev[curr]
    return [origin] + path[::-1]
```

Time: `O(VE)`, Space: `O(V)`.

The extra negative-cycle check is one more pass over all edges, so it does not
change the overall time complexity. The quick exit can make the average case
faster, but the worst case is still `O(VE)`.
