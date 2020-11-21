Monotone queue.md
	To get the max/min value from a moving window

	- 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

```python  
class Solution:  
    def longestSubarray(self, nums: List[int], limit: int) -> int:  
        minStack, maxStack = deque(), deque()  
        l, ret = 0, 0  
        for i, num in enumerate(nums):  
            while minStack and nums[minStack[-1]] >= num:  
                minStack.pop()  
            minStack.append(i)  
            while maxStack and nums[maxStack[-1]] <= num:  
                maxStack.pop()  
            maxStack.append(i)  
            while nums[maxStack[0]] - nums[minStack[0]] > limit:  
                if minStack[0] == l:  
                    minStack.popleft()  
                if maxStack[0] == l:  
                    maxStack.popleft()  
                l += 1  
            ret = max(ret, i-l+1)  
        return ret  
```

