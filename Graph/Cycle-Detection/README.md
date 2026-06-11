Cycle Detection Overview

Cycle detection in a directed graph usually uses one of two ideas:

- DFS with recursion-path tracking.
- BFS/topological sort with Kahn's algorithm.

# Directed Graph

In a directed graph, an edge `u -> v` can point back into the current DFS path.
That is the key difference from an undirected graph. Seeing a previously visited
node is not enough to prove a cycle; the node must still be in the current
recursion path.

Useful examples:

- Course Schedule: detect whether prerequisites contain a cycle.
- Topological sort: possible only when the directed graph has no cycle.
- Dependency resolution: a package/module cannot depend on itself indirectly.

## DFS

Idea:

1. `visited` means this node has been fully explored before.
2. `stack` means this node is in the current DFS path.
3. If we reach a neighbor already in `stack`, we found a back edge, so there is a cycle.
4. Remove the node from `stack` after all outgoing edges are processed.

```python
from collections import defaultdict
from typing import List


class Solution:
    def hasCycle(self, n: int, edges: List[List[int]]) -> bool:
        def dfs(u):
            stack.add(u)
            visited.add(u)

            for v in graph[u]:
                if v in stack:
                    return True
                if v not in visited and dfs(v):
                    return True

            stack.remove(u)
            return False

        graph, visited, stack = defaultdict(set), set(), set()
        for u, v in edges:
            graph[u].add(v)

        for u in range(n):
            if u not in visited and dfs(u):
                return True
        return False
```

Time: `O(V + E)`

Space: `O(V + E)` for the graph, `O(V)` for `visited`, `stack`, and recursion.

## BFS (Kahn's Algorithm)

Idea:

1. Count each node's indegree.
2. Start from all nodes with indegree `0`.
3. Remove those nodes from the graph by decreasing their neighbors' indegree.
4. If every node can be removed, the graph is acyclic.
5. If some nodes remain, they are locked inside a cycle.

This is the same idea as topological sorting. A directed graph has a cycle if and
only if Kahn's algorithm cannot process all nodes.

```python
from collections import defaultdict
from typing import List


class Solution:
    def hasCycle(self, n: int, edges: List[List[int]]) -> bool:
        graph, indegree = defaultdict(list), [0] * n

        for u, v in edges:
            graph[u].append(v)
            indegree[v] += 1

        q = [u for u in range(n) if indegree[u] == 0]
        seen = 0

        while q:
            u = q.pop()
            seen += 1

            for v in graph[u]:
                indegree[v] -= 1
                if indegree[v] == 0:
                    q.append(v)

        return seen != n
```

Time: `O(V + E)`

Space: `O(V + E)` for the graph and indegree array.

For cycle detection, the order of processing zero-indegree nodes does not
matter. A plain list with `pop()` is enough. Use `deque.popleft()` only when you
specifically want FIFO queue order, such as when returning a stable topological
order.

In an interview, prefer `list` for the adjacency list unless the interviewer
explicitly says duplicate edges should be ignored. If duplicates should be
deduplicated, use `set` and only increment `indegree[v]` when `v` is newly added
to `graph[u]`.

## DFS vs Kahn's Algorithm

Use DFS when:

- You only need a boolean cycle check.
- You want to detect the cycle while traversing.
- The graph is naturally explored recursively.

Use Kahn's algorithm when:

- You also need a topological order.
- The problem talks about prerequisites, dependencies, or ordering.
- You want an iterative solution and avoid recursion depth issues.
