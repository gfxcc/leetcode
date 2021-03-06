README.md
```python  
class STree:  
    def __init__(self, nums):  
        if not nums: return  
        self.nums = nums  
        self.arr = [0] * len(nums) * 4  
        self.size = len(nums)  
        self._build(0, nums, 0, len(nums)-1)  
      
    def _build(self, sidx, nums, l, r):  
        if l == r:  
            self.arr[sidx] = nums[l]  
            return nums[l]  
        mid = (l+r) // 2  
        val = sum([self._build(sidx*2+1, nums, l    , mid),  
                   self._build(sidx*2+2, nums, mid+1, r  )])  
        self.arr[sidx] = val  
        return val  

    def sum(self, l, r):  
        return self._sum(0, 0, self.size-1, l, r)  
      
    def _sum(self, sidx, sl, sr, l, r):  
        if l <= sl <= sr <= r:  
            return self.arr[sidx]  
        elif sr < l or r < sl:  
            return 0  
        mid = (sl+sr) // 2  
        return sum([self._sum(sidx*2+1, sl   , mid, l, r),   
                    self._sum(sidx*2+2, mid+1, sr , l, r)])  

    def update(self, idx, delta):  
        self._update(0, 0, self.size-1, idx, delta)  
      
    def _update(self, sidx, sl, sr, idx, delta):  
        if sr < idx or idx < sl:  
            return  

        self.arr[sidx] += delta  
        if sl == sr: return  
        mid = (sl+sr) // 2  
        self._update(sidx*2+1, sl   , mid, idx, delta)  
        self._update(sidx*2+2, mid+1, sr , idx, delta)  
```

