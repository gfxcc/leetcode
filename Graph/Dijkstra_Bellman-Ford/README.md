README.md

## [Graph-Dijkstra](https://gfxcc.github.io/2019/06/01/Graph-Dijkstra/)

Use Dijkstra when all edge weights are non-negative. If the graph can contain
negative edge weights, use Bellman-Ford instead.

```python
def shortest_path(edges: List[List[int]], origin: int, dest: int) -> List[int]:
    """Return one shortest path from origin to dest, or [] if unreachable."""
    graph = defaultdict(dict)
    # Keep minimum weight edge if multiple edges exist between same vertices
    for u, v, w in edges:
        graph[u][v] = min(graph[u].get(v, math.inf), w)

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

    path, curr = [], dest
    while curr is not None:
        path.append(curr)
        curr = prev[curr]
    return path[::-1] if dest in prev else []
```

**Note:** For optimization, you can add an early termination condition (`if u == dest: break`) when you only need the shortest path to a specific destination rather than computing shortest paths to all reachable nodes.

Time: `O(E log V)`, Space: `O(V + E)`.

## [Bellman-Ford](https://gfxcc.github.io/2019/06/01/Graph-Bellman-Ford/)
