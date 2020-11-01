
[MIT 6.006 Introduction to Algorithms, Fall 2011]([https://www.youtube.com/playlist?list=PL3P3cZGn6p661AmJdHafLMLzPxy5CXy-i](https://www.youtube.com/playlist?list=PL3P3cZGn6p661AmJdHafLMLzPxy5CXy-i))

> Idea  

1. DP is a smart brute force. It remember state while exhausting all possible cases.  
2. DP is a DFS. Switching to BFS when it is too slow or taking too much memory to do DFS.  
3. Transformation formula is the key of DP. `Bottom up` or `Top down` is just the implementation technical.   
4. `Bottom up` implementation can be used to save memory when we only need states from last n levels.  
5. Pay attention to edge cases. Edge cases used to happen when each parameter(dimension variable) reaching 0.   
  E.g. 10. Regular Expression Matching  

    ```python  
    class Solution:  
        def isMatch(self, s: str, p: str) -> bool:  
            # Memorization: Time O(M*N) Space O(M*N)  
            m, n = len(s), len(p)  
            import functools  
            @functools.lru_cache(None)  
            def dp(x, y):  
                if y == 0: return x == 0  
                if x == 0: return y == 0 or y>=2 and p[y-1] == '*' and dp(x, y-2)  
                if p[y-1] != '*':  
                    return p[y-1] in [s[x-1], '.'] and dp(x-1, y-1)  
                else:  
                    return y>1 and (dp(x, y-2) or p[y-2] in [s[x-1], '.'] and dp(x-1, y))  
            return dp(m, n)  
    ```  

6. Same idea when dealing contest/competitive games. Find the optimal move by exhausting all possible choice.   
    ```python  
    DP(n) = max(Profit(move) - DP(move/next_start_point)  for move in possible_moves)  
    ```  

> Useful trick  


1. `dict` can be more flexible compare to `array` since you can switch between `i`, `i+1`, `i-1` as needed when dealing edge cases.  
2. Use tuple as key when multiple dimension dictionary/array is needed.   

    ```python  
    dp = {}  
    # 1-d  
    dp[0] = 10  
    # 2-d  
    dp[0, 0] = 10  
    # 3-d  
    dp[0,0,0] = 10  
    ```  

3. `@lru_cache(None)` can be used for `Top down` implementation.  
4. `State transformation formular` can be identical between `bottom up` and `top down` approach if we use variable carfully.  

    > [10. Regular Expression Matching]([https://leetcode.com/problems/regular-expression-matching/discuss/665501/Python-Concise-DP-Botton-up-%2B-Top-down](https://leetcode.com/problems/regular-expression-matching/discuss/665501/Python-Concise-DP-Botton-up-%2B-Top-down))
    > [44. Wildcard Matching]([https://leetcode.com/problems/wildcard-matching/discuss/687707/Python-Concise-DP-Bottom-up-%2B-Top-down](https://leetcode.com/problems/wildcard-matching/discuss/687707/Python-Concise-DP-Bottom-up-%2B-Top-down))

