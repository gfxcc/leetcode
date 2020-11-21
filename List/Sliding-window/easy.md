easy.md
	1. Dictionary, Dictionary, Dictionary  
	2. Prefix_sum

	- 3. Longest Substring Without Repeating Characters

```python  
class Solution:  
    def lengthOfLongestSubstring(self, s: str) -> int:  
        ret, counter, l = 0, Counter(), 0  
          
        for i, c in enumerate(s):  
            counter[c] += 1  
              
            while counter[c] > 1:  
                counter[s[l]] -= 1  
                l += 1  
              
            ret = max(ret, i-l+1)  
          
        return ret  
```

	- 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum

```python  
class Solution:  
    def minSumOfLengths(self, arr: List[int], target: int) -> int:  
        prefix = {0: -1}  
        best, bests, rst = math.inf, [math.inf] * len(arr), math.inf  
        cur = 0  
        for i, v in enumerate(arr):  
            cur += v  
            if cur - target in prefix:  
                begin = prefix[cur-target]  
                if begin > -1:  
                    rst = min(rst, i-begin + bests[begin])  
                best = min(best, i-begin)  
            bests[i] = best  
            prefix[cur] = i  
        return rst if rst != math.inf else -1  
```  
		
		Following solution is more straightforward.   
```python  
class Solution:  
    def minSumOfLengths(self, arr: List[int], target: int) -> int:  
        size_l, size_r = [math.inf] * len(arr), [math.inf] * len(arr)  
          
        l, cur_sum, best = 0, 0, math.inf  
        for i, num in enumerate(arr):  
            cur_sum += num  
            while cur_sum > target:  
                cur_sum -= arr[l]  
                l += 1  
                  
            if cur_sum == target:  
                best = min(best, i-l+1)  
              
            size_l[i] = best  
              
        r, cur_sum, best = len(arr)-1, 0, math.inf  
        for i in range(len(arr))[::-1]:  
            while cur_sum > target:  
                cur_sum -= arr[r]  
                r -= 1  
      
            if cur_sum == target:  
                best = min(best, r-i)  
            cur_sum += arr[i]  
            size_r[i] = best  
          
        ret = min(size_l[i]+size_r[i] for i in range(len(arr)))  
        return ret if ret != math.inf else -1  
```

	- 76. Minimum Window Substring

```python  
class Solution:  
    def minWindow(self, s: str, t: str) -> str:  
        c = Counter(t)  
        cnt = len(c)  
        l, r, rst = 0, 0, s+t  
        while r < len(s) or cnt == 0:  
            if cnt == 0:  
                # move l  
                c[s[l]] += 1  
                if c[s[l]] == 1:  
                    cnt += 1  
                l += 1  
            else:  
                # move r  
                c[s[r]] -= 1  
                if c[s[r]] == 0:  
                    cnt -= 1  
                r += 1  
            if cnt == 0 and len(s[l:r]) < len(rst):  
                rst = s[l:r]  
        return rst if rst != s+t else ''  
                  
                      
```

	- 159. Longest Substring with At Most Two Distinct Characters

```python  
class Solution:  
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:  
        d, cnt, ret = Counter(), 2, 0  
        for i, c in enumerate(s):  
            d[c] += 1  
            if d[c] == 1:  
                cnt += 1  
            if len(d) <= 2:  
                ret += 1  
            else:  
                d[s[i-ret]] -= 1  
                if d[s[i-ret]] == 0:  
                    del d[s[i-ret]]  
        return ret  

```

	- 1358. Number of Substrings Containing All Three Characters

```python  
class Solution:  
    def numberOfSubstrings(self, s: str) -> int:  
        ret, d, cnt, l = 0, Counter(), 0, 0  
        for i, c in enumerate(s):  
            d[c] += 1  
            if d[c] == 1: cnt += 1  
            if cnt == 3:  
                while d[s[l]] > 1:  
                    d[s[l]] -= 1  
                    l += 1  
                ret += l+1  
        return ret  
```

	- 346. Moving Average from Data Stream

```python  
class MovingAverage:  

    def __init__(self, size: int):  
        self.q = deque()  
        self.cap = size  
        self.sum = 0  

    def next(self, val: int) -> float:  
        self.sum += val  
        self.q.append(val)  
          
        if len(self.q) > self.cap:  
            self.sum -= self.q.popleft()  
              
        return self.sum / len(self.q)  
```

	- 1031. Maximum Sum of Two Non-Overlapping Subarrays

```python  
class Solution:  
    def maxSumTwoNoOverlap(self, A: List[int], L: int, M: int) -> int:  
        def solve(L, M):  
            s1, s2 = sum(A[:L]), sum(A[L:L+M])  
            ret, maxS1 = s1+s2, s1  
            for i in range(L+M, len(A)):  
                s2 += A[i] - A[i-M]  
                s1 += A[i-M] - A[i-M-L]  
                maxS1 = max(maxS1, s1)  
                ret = max(ret, maxS1+s2)  
            return ret  
        return max(solve(L, M), solve(M, L))  
```

	- 1423. Maximum Points You Can Obtain from Cards

```python  
class Solution:  
    def maxScore(self, A: List[int], k: int) -> int:  
        size = len(A) - k  
        s = sum(A[:size])  
        cur = s  
          
        for i in range(size, len(A)):  
            cur += A[i] - A[i-size]  
            s = min(s, cur)  
          
        return sum(A) - s  
```

	- 1296. Divide Array in Sets of K Consecutive Numbers

```python  
class Solution:  
    def isPossibleDivide(self, nums: List[int], k: int) -> bool:  
        counter = Counter(nums)  
          
        for num in sorted(counter.keys()):  
            cnt = counter[num]  
            if cnt > 0:  
                for i in range(k):  
                    if counter[num+i] < cnt:  
                        return False  
                    counter[num+i] -= cnt  
          
        return all(v == 0 for v in counter.values())  
```

