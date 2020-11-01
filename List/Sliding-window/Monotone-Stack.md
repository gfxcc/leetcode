
	- 84. Largest Rectangle in Histogram

		```python  
		class Solution:  
		    def largestRectangleArea(self, heights: List[int]) -> int:  
		        stack = []  
		        rst = 0  
		        for i, height in enumerate(heights + [0]):  
		            idx_prev = i  
		            while stack and stack[-1][1] >= height:  
		                idx_prev, h_prev = stack.pop()  
		                rst = max(rst, (i - idx_prev) * h_prev)  
		            stack.append((idx_prev, height))  
		        return rst  
		```

	- 85. Maximal Rectangle

		```python  
		class Solution:  
		    def maximalRectangle(self, M: List[List[str]]) -> int:  
		        if not M or not M[0]: return 0  
		        m, n = len(M), len(M[0])  
		        rst = 0  
		        h = [0] * (n+1)  
		        for row in M:  
		            stack = [(0, -1)]  
		            for i, v in enumerate(row+[0]):  
		                if v == '1':  
		                    h[i] += 1  
		                else:  
		                    h[i] = 0  
		                idx = i  
		                while stack and stack[-1][0] > h[i]:  
		                    height, idx = stack.pop()  
		                    rst = max(rst, height * (i-idx))  
		                stack.append((h[i], idx))  
		        return rst  
		```

	- 1475. Final Prices With a Special Discount in a Shop

	- 556. Next Greater Element III

		https://leetcode.com/problems/next-greater-element-iii/discuss/702697/Python-Concise-O(n)

	- 42. Trapping Rain Water

		```python  
		class Solution:  
		    def trap(self, height: List[int]) -> int:  
		        stack, ret = [], 0  
		          
		        for i, val in enumerate(height):  
		            while stack and height[stack[-1]] <= val:  
		                if len(stack) >= 2:  
		                    h = min(val, height[stack[-2]]) - height[stack[-1]]  
		                    w = i - stack[-2] - 1  
		                    ret += w * h  
		                stack.pop()  
		            stack.append(i)  
		          
		        return ret  
		```

	- 654. Maximum Binary Tree

		```python  
		# Definition for a binary tree node.  
		# class TreeNode:  
		#     def __init__(self, val=0, left=None, right=None):  
		#         self.val = val  
		#         self.left = left  
		#         self.right = right  
		class Solution:  
		    def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:  
		        '''  
		        # Recursive  
		        if not nums: return None  
		        val = max(nums)  
		        return TreeNode(val, self.constructMaximumBinaryTree(nums[:nums.index(val)]),  
		                             self.constructMaximumBinaryTree(nums[nums.index(val)+1:]))  
		        '''  
		        '''  
		        # Recursive optimized  
		        def dfs(l, r):  
		            if l == r: return None  
		            val = max(nums[l:r])  
		            idx = l + nums[l:r].index(val)  
		            return TreeNode(val, dfs(l, idx), dfs(idx+1, r))  
		        return dfs(0, len(nums))  
		        '''  
		        '''  
		        # Non-recursive  
		        ret = TreeNode()  
		        stack = [((0, len(nums)), (ret, 'l'))]  
		        while stack:  
		            (l, r), (p, dir) = stack.pop()  
		            if l == r: continue  
		            node = TreeNode(max(nums[l:r]))  
		            idx = l + nums[l:r].index(node.val)  
		            if dir == 'l': p.left = node  
		            else: p.right = node  
		              
		            stack.append(((idx+1, r), (node, 'r')))  
		            stack.append(((l, idx), (node, 'l')))  
		        return ret.left  
		        '''  
		        # Optimal  
		        stack = []  
		        for val in nums:  
		            node = TreeNode(val)  
		            left = None  
		            while stack and stack[-1].val < val:  
		                left = stack.pop()  
		            node.left = left  
		            if stack:  
		                stack[-1].right = node  
		            stack.append(node)  
		        return stack[0]  
		```

