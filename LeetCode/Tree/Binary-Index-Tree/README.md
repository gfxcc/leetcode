
> Wikipedia: A Fenwick tree or binary indexed tree is a data structure that can efficiently update elements and calculate prefix sums in a table of numbers.  

> note  
0. **Index 0 is discarded in BIT**  
1. BIT can be used to calculate prefix-sum  
2. As an extension of #1, BIT can be used for range sum query. Aka RSQ  
3. It can be used to track the number of value greater/smaller values.  
    Segment Tree, SortedList (multiset), Balanced Tree can achieve similar goal  
    See [315. Count of Smaller Numbers After Self]() for details on this point  

```python  
class BIT:  
    def __init__(self, size):  
        self.arr = [0] * (size+1)  
          
    def sum(self, x):  
        x += 1  
        ret = 0  
        while x:  
            ret += self.arr[x]  
            x -= x & (-x)  
        return ret  
      
    def update(self, x, delta):  
        x += 1  
        while x < len(self.arr):  
            self.arr[x] += delta  
            x += x & (-x)  
```

