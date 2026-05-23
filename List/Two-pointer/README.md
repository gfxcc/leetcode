# Two Pointer

## 1. 解决的问题类型

它适用于那些可以通过双向收敛来缩小搜索空间的问题，比如求和、区间搜索、或左右边界比较。

**Examples:**
- Finding pairs or triplets that sum to a target
- Partitioning or separating elements in an array
- Detecting cycles or meeting points
- Merging or comparing two sequences
- Range search and boundary comparison

## 2. 如何使用双指针

首先，找到让指针移动与答案产生关联的逻辑。这可以是排序后让左右相向移动，也可以是基于自然特性，比如记住左右最大值。

**Key approaches:**
- **Sorted convergence**: After sorting, move left and right pointers towards each other based on comparison
  - If sum is too small, move left pointer right (increase sum)
  - If sum is too large, move right pointer left (decrease sum)

- **Natural properties**: Leverage inherent data properties without sorting
  - Remember left/right maximum values
  - Use monotonic properties of the array
  - Track conditions that guarantee valid moves

- **Core principle**: Find the logic that links every pointer movement to the answer. Each step must move you closer to the solution.

## 3. 复杂问题的构建方法

对于更复杂的问题，考虑多指针：固定部分指针，将三维、四维简化成双维度，或者通过排序来赋予移动价值。重点在于，让每一步移动都朝向答案。记住，只要构建出有意义的移动路径，双指针就能高效发挥。

**Strategies:**
- **Multi-pointer approach**: Fix some pointers to reduce dimensions
  - 3-sum: Fix one element, apply 2-pointer on remaining array
  - 4-sum: Fix two elements, apply 2-pointer on remaining array

- **Sorting for meaningful movement**: Sort first to give meaning to pointer movement
  - Enables skipping invalid states efficiently
  - Guarantees monotonic progress towards answer

- **Build meaningful paths**: The key is constructing a path where each step is guaranteed to move closer to the solution
  - Not all problems suit two-pointer if the movement logic isn't clear
  - Once you establish valid movement logic, two-pointer becomes highly efficient

## Key Variants

- **Opposite ends**: Two pointers starting from both ends, moving towards each other
- **Same direction**: Both pointers moving in the same direction at different speeds  
- **Fast/slow**: Useful for finding middle, cycle detection, or removing duplicates
