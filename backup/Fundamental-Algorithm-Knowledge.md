# LeetCode


## List


> Tricks  

1. `Counter()` can be used to create a `defaultdict(int)`

### I do not know....

- 443. String Compression

	```python  
	class Solution:  
	    def repeatedSubstringPattern(self, s: str) -> bool:  
	        return s in (s*2)[1:-1]  
	```

- 686. Repeated String Match

	```python  
	class Solution:  
	    def repeatedStringMatch(self, A: str, B: str) -> int:  
	        time = (len(B) // len(A)) + (1 if len(B) % len(A) else 0)  
	        if B in A * time: return time  
	        if B in A * (time+1): return time+1  
	        return -1  
	```

### Pure programming

- 890. Find and Replace Pattern

	```python  
	class Solution:  
	    def findAndReplacePattern(self, words: List[str], pattern: str) -> List[str]:  
	        def is_valid(word):  
	            if len(word) != len(pattern):  
	                return False  
	            d_12, d_21 = {}, {}  
	            for c1, c2 in zip(word, pattern):  
	                if c1 not in d_12:  
	                    if c2 in d_21:  
	                        return False  
	                    d_12[c1] = c2  
	                    d_21[c2] = c1  
	                elif d_12[c1] != c2:  
	                    return False  
	            return True  
	        rst = []  
	        for word in words:  
	            if is_valid(word):  
	                rst.append(word)  
	        return rst  
	```

- 539. Minimum Time Difference

	```python  
	class Solution:  
	    def findMinDifference(self, timePoints: List[str]) -> int:  
	        times = sorted(int(time.split(':')[0])*60+int(time.split(':')[1]) for time in timePoints)  
	        times.append(times[0]+60*24)  
	        return min(b-a for a, b in zip(times, times[1:]))  
	```

- 680. Valid Palindrome II

	https://leetcode.com/problems/valid-palindrome-ii/discuss/701203/Python-Concise-O(n)

- 541. Reverse String II

- 249. Group Shifted Strings

	```python  
	class Solution:  
	    def groupStrings(self, strings: List[str]) -> List[List[str]]:  
	          
	        d = defaultdict(list)  
	        for s in strings:  
	            delta = ord(s[0]) - ord('a')  
	            ss = ''.join(chr(97+((ord(c)-97-delta) % 26)) for c in s)  
	            d[ss].append(s)  
	        return d.values()  
	```

- 30. Substring with Concatenation of All Words

	```python  
	class Solution:  
	    def findSubstring(self, s: str, words: List[str]) -> List[int]:  
	        if not words:  
	            return []  
	        c = Counter(words)  
	        size = len(words[0])  
	        rst = []  
	        for i in range(len(s)+1-size*len(words)):  
	            j, cc = i, c.copy()  
	            while j < i+size*len(words) and s[j:j+size] in c:  
	                cur_w = s[j:j+size]  
	                cc[cur_w] -= 1  
	                if cc[cur_w] < 0:  
	                    break  
	                j += size  
	            if all(v == 0 for v in cc.values()):  
	                rst.append(i)  
	        return rst  
	```

- 557. Reverse Words in a String III

	```python  
	class Solution:  
	    def reverseWords(self, s: str) -> str:  
	        return ' '.join(w[::-1] for w in s.split())  
	```

- 415. Add Strings

	```python  
	class Solution:  
	    def addStrings(self, num1: str, num2: str) -> str:  
	        rst = ''  
	        carry = False  
	        num1, num2 = list(num1), list(num2)  
	        while num1 or num2:  
	            cur = (int(num1.pop()) if num1 else 0) + (int(num2.pop()) if num2 else 0) + carry  
	            rst += str(cur % 10)  
	            carry = cur // 10  
	        if carry:  
	            rst += '1'  
	        return rst[::-1]  
	```

- 791. Custom Sort String

	https://leetcode.com/problems/custom-sort-string/discuss/702725/Python-Concise-O(N)-%2B-Sort

- 443. String Compression

	```python  
	class Solution:  
	    def compress(self, chars: List[str]) -> int:  
	        idx1, idx2, cnt = 0, 0, 0  
	        chars.append('0')  
	        for i, c in enumerate(chars):  
	            if i != 0 and chars[i] != chars[i-1]:  
	                chars[idx1] = chars[i-1]  
	                idx1 += 1  
	                if cnt == 1:  
	                    continue  
	                for cc in str(cnt):  
	                    chars[idx1] = cc  
	                    idx1 += 1  
	                cnt = 1  
	            else:  
	                cnt += 1  
	                  
	        return idx1  
	```

- 2. Add Two Numbers

	```python  
	class Solution:  
	    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:  
	        ret = ListNode()  
	        c1, c2, cur, carry = l1, l2, ret, False  
	          
	        while c1 or c2:  
	            val = (c1.val if c1 else 0) + (c2.val if c2 else 0) + carry  
	            cur.next, carry = ListNode(val % 10), val // 10  
	            cur = cur.next  
	            c1, c2 = c1.next if c1 else c1, c2.next if c2 else c2  
	        else:  
	            if carry:  
	                cur.next = ListNode(1)  
	          
	        return ret.next  
	```

- 43. Multiply Strings

	
	```python  
	class Solution:  
	    def multiply(self, num1: str, num2: str) -> str:  
	        if num1 == '0' or num2 == '0': return '0'  
	        num1, num2 = num1[::-1], num2[::-1]  
	        m, n = len(num1), len(num2)  
	        rst = [0] * (m+n)  
	        for i1, v1 in enumerate(num1):  
	            for i2, v2 in enumerate(num2):  
	                rst[i1+i2] += int(v1) * int(v2)  
	                rst[i1+i2+1] += rst[i1+i2] // 10  
	                rst[i1+i2] %= 10  
	        while rst[-1] == 0:  
	            rst.pop()  
	        return ''.join(map(str, rst))[::-1]  
	```

- 161. One Edit Distance

	https://leetcode.com/problems/one-edit-distance/discuss/702870/Python-Concise-Understand-it-in-5-second

- 1181. Before and After Puzzle

	```python  
	class Solution:  
	    def beforeAndAfterPuzzles(self, phrases: List[str]) -> List[str]:  
	        start = defaultdict(list)  
	        for i, p in enumerate(phrases):  
	            words = p.split()  
	            a, b = words[0], ' '.join(words[1:])  
	            start[a].append((i, b))  
	        ret = []  
	        for i, p in enumerate(phrases):  
	            words = p.split()  
	            ret += [(p + (f' {w}' if w else '')) for j, w in start[words[-1]] if i != j]  
	        return sorted(set(ret))            
	```

- 49. Group Anagrams

	https://leetcode.com/problems/group-anagrams/discuss/681219/Python-Concise-O(N)-no-need-to-sort-str

- 67. Add Binary

	```python  
	class Solution:  
	    def addBinary(self, a: str, b: str) -> str:  
	        a, b = list(a), list(b)  
	        carry, rst = False, ''  
	        while a or b:  
	            v1, v2 = int(a.pop()) if a else 0, int(b.pop()) if b else 0  
	            v = v1 + v2 + carry  
	            rst += str(v % 2)  
	            carry = v // 2  
	        if carry:  
	            rst += '1'  
	        return rst[::-1]  
	```

- 824. Goat Latin

	```python  
	class Solution:  
	    def toGoatLatin(self, S: str) -> str:  
	        words = []  
	        for i, s in enumerate(S.split()):  
	            if s[0].lower() in ['a', 'e', 'i', 'o', 'u']:  
	                s += 'ma'  
	            else:  
	                s = s[1:]+s[0]+'ma'  
	            s += 'a' * (i+1)  
	            words.append(s)  
	        return ' '.join(words)  
	```

- 537. Complex Number Multiplication

	https://leetcode.com/problems/complex-number-multiplication/discuss/702715/Python-Concise-%2B-Straightforward

- 833. Find And Replace in String

	```python  
	class Solution:  
	    def findReplaceString(self, S: str, indexes: List[int], sources: List[str], targets: List[str]) -> str:  
	        ret, cur = '', 0  
	          
	        for idx, u, v in sorted(zip(indexes, sources, targets)):  
	            if cur < idx:  
	                ret += S[cur:idx]  
	                cur = idx  
	              
	            if S[cur:cur+len(u)] == u:  
	                ret += v  
	                cur += len(u)  
	            else:  
	                ...  
	          
	        return ret + S[cur:]  
	```

- 146. LRU Cache

	```python  
	class Node:  
	    def __init__(self, val=0, prev=None, next=None):  
	        self.val, self.prev, self.next = val, prev, next  
	
	
	class Dlist:  
	    def __init__(self):  
	        self.head, self.tail = Node(), Node()  
	        self.head.next = self.tail  
	        self.tail.prev = self.head  
	      
	    def appendleft(self, item):  
	        item.next = self.head.next  
	        item.next.prev = item  
	        item.prev = self.head  
	        self.head.next = item  
	      
	    def popitem(self, item):  
	        item.next.prev = item.prev  
	        item.prev.next = item.next  
	      
	    def last(self):  
	        return self.tail.prev  
	          
	          
	class LRUCache:  
	
	    def __init__(self, capacity: int):  
	        self.list = Dlist()  
	        self.capa = capacity  
	        self.data = {}  
	
	    def get(self, key: int) -> int:  
	        if key not in self.data:  
	            return -1  
	        item, ret = self.data[key]  
	        self.list.popitem(item)  
	        self.list.appendleft(item)  
	        return ret  
	
	    def put(self, key: int, value: int) -> None:  
	        if key in self.data:  
	            self.data[key][1] = value  
	            self.get(key)  
	        else:  
	            item = Node(key)  
	            self.data[key] = [item, value]  
	            self.list.appendleft(item)  
	          
	        if len(self.data) > self.capa:  
	            to_pop_item = self.list.last()  
	            self.list.popitem(to_pop_item)  
	            del self.data[to_pop_item.val]  
	
	```

- 157. Read N Characters Given Read4

	```python  
	class Solution:  
	    def read(self, buf, n):  
	        """  
	        :type buf: Destination buffer (List[str])  
	        :type n: Number of characters to read (int)  
	        :rtype: The number of actual characters read (int)  
	        """  
	        if n <= 0: return 0  
	        for i in range(n)[::4]:  
	            tmp = [0] * 4  
	            size = read4(tmp)  
	            for j in range(size):  
	                buf[i+j] = tmp[j]  
	            if size != 4: break  
	        return min(n, i+size)  
	
	```

- 158. Read N Characters Given Read4 II - Call multiple times

	```python  
	class Solution:  
	    def __init__(self):  
	        self.remain = []  
	          
	    def read(self, buf: List[str], n: int) -> int:  
	        while len(self.remain) < n:  
	            tmp = [None] * 4  
	            cnt = read4(tmp)  
	            self.remain.extend(tmp[:cnt])  
	            if cnt < 4:  
	                break  
	        cnt = len(self.remain)  
	        for i in range(min(cnt, n)):  
	            buf[i] = self.remain[i]  
	        self.remain[:n] = []  
	        return min(cnt, n)  
	```

- 767. Reorganize String

	```python  
	class Solution:  
	    def reorganizeString(self, S: str) -> str:  
	        rst = []  
	        counter = Counter(S)  
	        order = sorted(counter.keys(), key=lambda x: -counter[x])  
	        idx, size = 0, counter[order[0]]  
	        bucket = [[] for _ in range(size)]  
	        for c in order:  
	            for _ in range(counter[c]):  
	                bucket[idx].append(c)  
	                idx = (idx+1) % size  
	        if size > 1 and len(bucket[size-2]) == 1:  
	            return ''  
	        return ''.join(''.join(b) for b in bucket)  
	```

- 1096. Brace Expansion II

	```python  
	class Solution:  
	    def braceExpansionII(self, expression: str) -> List[str]:  
	        def helper(pattern):  
	            item, items = [''], []  
	            pattern = deque(pattern)  
	            while pattern:  
	                cur = pattern.popleft()  
	                if cur == ',':  
	                    items.append(item)  
	                    item = ['']  
	                else:  
	                    if cur == '{':  
	                        level = 1  
	                        sub_p = ''  
	                        while level:  
	                            sub_p += pattern.popleft()  
	                            if sub_p[-1] == '{': level += 1  
	                            elif sub_p[-1] == '}': level -= 1  
	                        sub_p = sub_p[:-1]  
	                        cur = helper(sub_p)  
	                    else:  
	                        cur = [cur]  
	                    item = [a+b for a in item for b in cur]  
	            else:  
	                items.append(item)  
	            return sorted(set(s for item in items for s in item))  
	        return helper(expression)  
	```

- 722. Remove Comments

	[https://leetcode.com/problems/remove-comments/discuss/702669/Python-line-by-line-O(N)](https://leetcode.com/problems/remove-comments/discuss/702669/Python-line-by-line-O(N))
	
	
	```python  
	class Solution:  
	    def removeComments(self, source: List[str]) -> List[str]:  
	        '''  
	        1. in block comment?  
	            yes -> search for end of block comment  
	            no -> search for beginnning of block comment  
	               -> search for beginnning of line comment  
	          
	        '''  
	        ret, in_block, prev, i = [], False, '', 0  
	          
	        while i < len(source):  
	            line = source[i]  
	            if not in_block:  
	                idx_line, idx_block = line.find('//'), line.find('/*')  
	                if idx_line == -1 and idx_block == -1:  
	                    if prev+line:  
	                        ret.append(prev+line)  
	                    prev = ''  
	                    i += 1  
	                elif idx_line == -1 or (idx_block != -1 and idx_block < idx_line):  
	                    prev += line[:idx_block]  
	                    source[i], in_block = line[idx_block+2:], True  
	                else:  
	                    if prev or idx_line != 0:  
	                        ret.append(prev+line[:idx_line])  
	                    prev = ''  
	                    i += 1  
	            else:  
	                idx_end_block = line.find('*/')  
	                if idx_end_block == -1:  
	                    i += 1  
	                else:  
	                    source[i], in_block = line[idx_end_block+2:], False  
	                      
	        return ret  
	```

- 809. Expressive Words

	```python  
	class Solution:  
	    def expressiveWords(self, S: str, words: List[str]) -> int:  
	        def condense(s):  
	            p_c, cnt, ret = s[0], 1, []  
	            for c in s[1:]+'$':  
	                if c != p_c:  
	                    ret.append((p_c, cnt))  
	                    p_c, cnt = c, 1  
	                else:  
	                    cnt += 1  
	            return ret  
	                      
	        cond = condense(S)  
	        ret = 0  
	        for word in words:  
	            cond_cur = condense(word)  
	            if len(cond_cur) == len(cond) and all(a[0]==b[0] and (a[1]==b[1] or a[1]>b[1] and a[1]>=3) for a, b in zip(cond, cond_cur)):  
	                ret += 1  
	        return ret  
	```

- 316. Remove Duplicate Letters

	```python  
	class Solution:  
	    def removeDuplicateLetters(self, s: str) -> str:  
	        ret, start = '', 0  
	        chars = set(s)  
	        while chars:  
	            for c in string.ascii_lowercase:  
	                if c in ret or c not in s: continue  
	                if set(s[s.index(c):]) >= chars:  
	                    ret += c  
	                    chars.remove(c)  
	                    s = s[s.index(c)+1:]  
	                    break  
	        return ret  
	```

- 271. Encode and Decode Strings

	https://leetcode.com/problems/encode-and-decode-strings/discuss/715649/Python-Straightforward

- 1156. Swap For Longest Repeated Character Substring

	```python  
	class Solution:  
	    def maxRepOpt1(self, s: str) -> int:  
	        c_len, size = [[c, len(list(g))] for c, g in itertools.groupby(s)], 1  
	        ret = 0  
	        counter = Counter(c for c, size in c_len)  
	        for i, (c, size) in enumerate(c_len):  
	            ret = max(ret, size+(counter[c]>1))  
	            if i >= 2 and c_len[i-1][1] == 1 and c_len[i-2][0] == c:  
	                if counter[c] > 2:  
	                    ret = max(ret, size + c_len[i-2][1] + 1)  
	                else:  
	                    ret = max(ret, size + c_len[i-2][1])  
	        return ret  
	```

- 1247. Minimum Swaps to Make Strings Equal

	```python  
	class Solution:  
	    def minimumSwap(self, s1: str, s2: str) -> int:  
	        xy, yx = 0, 0  
	        for a, b in zip(s1, s2):  
	            if a == b: continue  
	            elif a == 'x': xy += 1  
	            else: yx += 1  
	        return -1 if (xy+yx) % 2 else ((xy+yx) // 2 + (xy%2))  
	```

- 678. Valid Parenthesis String

	https://leetcode.com/problems/valid-parenthesis-string/discuss/107570/JavaC%2B%2BPython-One-Pass-Count-the-Open-Parenthesis

- 1163. Last Substring in Lexicographical Order

- 522. Longest Uncommon Subsequence II

	```python  
	class Solution:  
	    def findLUSlength(self, strs: List[str]) -> int:  
	        # This is an important technic to check whether a string is a substring of another string  
	        def is_substr(s, ss):  
	            idx = 0  
	            for c in ss:  
	                if idx < len(s) and c == s[idx]:  
	                    idx += 1  
	            return idx == len(s)  
	        strs = sorted(strs, key=lambda x:len(x), reverse=True)  
	        for i, s in enumerate(strs):  
	            if all(not is_substr(s, ss) for j, ss in enumerate(strs) if i != j):  
	                return len(s)  
	        return -1  
	```

- 936. Stamping The Sequence

	```python  
	class Solution:  
	    def movesToStamp(self, s: str, t: str) -> List[int]:  
	        def check(idx):  
	            moved = False  
	            for i in range(m):  
	                if t[idx+i] == '?': continue  
	                if t[idx+i] != s[i]: return False  
	                moved = True  
	            t[idx:idx+m] = ['?'] * m  
	            if moved:  
	                ret.append(idx)  
	            return moved  
	        m, n, ret, s, t = len(s), len(t), [], list(s), list(t)  
	        moved = True  
	        while moved:  
	            moved = False  
	            for i in range(n-m+1):  
	                moved |= check(i)  
	        return ret[::-1] if t == ['?']*n else []  
	```

- 186. Reverse Words in a String II

	https://leetcode.com/problems/reverse-words-in-a-string-ii/discuss/715615/Python-Concise-In-place

- 57. Insert Interval

	```python  
	class Solution:  
	    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:  
	        ret, added = [], False  
	        start, end = newInterval  
	        for l, r in intervals:  
	            if r < start:  
	                ret.append([l, r])  
	            elif end < l:  
	                if not added:  
	                    ret.append(list(newInterval))  
	                    added = True  
	                ret.append([l, r])  
	            else:  
	                if added:  
	                    pl, pr = ret[-1]  
	                    ret[-1] = [min(pl, l), max(pr, r)]  
	                else:  
	                    ret.append([min(start, l), max(end, r)])  
	                    added = True  
	        if not added:  
	            ret.append(list(newInterval))  
	        return ret  
	```

- 659. Split Array into Consecutive Subsequences

	```python  
	class Solution:  
	    def isPossible(self, nums: List[int]) -> bool:  
	        tail, req = Counter(), Counter() # defaultdict(int)  
	          
	        for num in nums:  
	            if req[num] > 0:  
	                req[num] -= 1  
	            if tail[num-1]:  
	                tail[num-1] -= 1  
	                tail[num] += 1  
	            else:  
	                tail[num] += 1  
	                req[num+1] += 1  
	                req[num+2] += 1  
	          
	        return all(v == 0 for v in req.values())  
	```

- 681. Next Closest Time

	```python  
	class Solution:  
	    def nextClosestTime(self, time: str) -> str:  
	        # if cur_minute != max_minute  
	        #.     -> update minute to nxt_minute  
	        # elif cur_hour != max_hour  
	        #.     -> update hour to nxt_hour, update minute to min_minute  
	        # else:  
	        #.     update hour to min_hour, update minute to min_minute  
	        def to_valid(input):  
	            ret = str(input)  
	            if len(ret) == 2:  
	                return ret  
	            return '0' + ret  
	          
	        digits = sorted(list(set(c for c in time if c != ':')))  
	        hour, minute = map(int, time.split(':'))  
	          
	        minutes = []  
	        for i in range(60):  
	            if all(c in digits for c in to_valid(i)):  
	                minutes.append(i)  
	                  
	        hours = []  
	        for i in range(24):  
	            if all(c in digits for c in to_valid(i)):  
	                hours.append(i)  
	          
	        if minute != minutes[-1]:  
	            return to_valid(hour) + ':' + to_valid(minutes[minutes.index(minute)+1])  
	        elif hour != hours[-1]:  
	            return to_valid(hours[hours.index(hour)+1]) + ':' + to_valid(minutes[0])  
	        else:  
	            return to_valid(hours[0]) + ':' + to_valid(minutes[0])  
	          
	```

### Palindromic

Manacher's Algorithm  
[https://www.youtube.com/watch?v=nbTSfrEfo6M](https://www.youtube.com/watch?v=nbTSfrEfo6M)

- 5. Longest Palindromic Substring

	[https://leetcode.com/problems/longest-palindromic-substring/discuss/3337/Manacher-algorithm-in-Python-O(n)](https://leetcode.com/problems/longest-palindromic-substring/discuss/3337/Manacher-algorithm-in-Python-O(n))
	
	```python  
	class Solution:  
	    def longestPalindrome(self, s: str) -> str:  
	        ret, i = '', 0  
	          
	        while i < len(s):  
	            j = i  
	            while j < len(s) and s[j] == s[i]:  
	                j += 1  
	              
	            k = 0  
	            while i-k >= 0 and j+k-1 < len(s) and s[i-k] == s[j+k-1]:  
	                if j-i+2*k > len(ret):  
	                    ret = s[i-k:j+k]  
	                k += 1  
	              
	            i = j  
	        return ret            
	```

- 647. Palindromic Substrings

	O(N^2) - None Manacher's Algorithm  
	```python  
	class Solution:  
	    def countSubstrings(self, s: str) -> int:  
	        if not s: return 0  
	        rst = len(s)  
	        i = 0  
	        while i < len(s):  
	            j = i  
	            while i+1 < len(s) and s[i] == s[i+1]:  
	                i += 1  
	                rst += i-j  
	            rr = i  
	            while j - 1 >= 0 and i + 1 < len(s) and s[j-1] == s[i+1]:  
	                j -= 1  
	                i += 1  
	                rst += 1  
	            i = rr + 1  
	        return rst  
	```

- 336. Palindrome Pairs

	```python  
	class Solution:  
	    def palindromePairs(self, words: List[str]) -> List[List[int]]:  
	        # N^2 * K  ->  N * K^2  
	        d = {word: i for i, word in enumerate(words)}  
	        ret = set()  
	        for i, word in enumerate(words):  
	            for j in range(0, len(word)+1):  
	                # i, k  
	                t = word[:j][::-1]  
	                if t in d and word+t == (word+t)[::-1] and d[t] != i:  
	                    ret.add((i, d[t]))  
	                # k, i  
	                t = word[len(word)-j:][::-1]  
	                if t in d and t+word == (t+word)[::-1] and d[t] != i:  
	                    ret.add((d[t], i))  
	        return list(ret)      
	```

### Math

I do not know.   
You tell me how to solve it.

- 899. Orderly Queue

### Sliding window 

Maintain a state while sliding window

- easy

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

- Monotone Stack

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

- Monotone queue

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

### Heap sort Priority Queue

- 215. Kth Largest Element in an Array

	```python  
	class Solution:  
	    def findKthLargest(self, nums: List[int], k: int) -> int:  
	        pq = []  
	        for n in nums:  
	            heapq.heappush(pq, n)  
	            if len(pq) > k:  
	                heapq.heappop(pq)  
	        return heapq.heappop(pq)  
	```

- 973. K Closest Points to Origin

	```python  
	class Solution:  
	    def kClosest(self, points: List[List[int]], K: int) -> List[List[int]]:  
	        pq = []  
	        for x, y in points:  
	            dis = (x*x + y*y)  
	            heapq.heappush(pq, (-dis, (x, y)))  
	            if len(pq) > K:  
	                heapq.heappop(pq)  
	        return [list(point) for _, point in pq]  
	```

- 632. Smallest Range Covering Elements from K Lists

	```python  
	class Solution:  
	    def smallestRange(self, nums: List[List[int]]) -> List[int]:  
	        q = [(num[0], num, 1) for num in nums]  
	        heapq.heapify(q)  
	        rst = [min(q)[0], max(q)[0]]  
	        cur_max = max(q)[0]  
	        while True:  
	            val, num, idx = heapq.heappop(q)  
	            if idx == len(num):  
	                return rst  
	            heapq.heappush(q, (num[idx], num, idx+1))  
	            cur_max = max(num[idx], cur_max)  
	            if cur_max - q[0][0] < rst[1] - rst[0]:  
	                rst = [q[0][0], cur_max]  
	```

- 857. Minimum Cost to Hire K Workers

	```python  
	from sortedcontainers import SortedList  
	class Solution:  
	    def mincostToHireWorkers(self, quality: List[int], wage: List[int], K: int) -> float:  
	        ratios = [(w/q, (w, q)) for q, w in zip(quality, wage)]  
	        workers = SortedList()  
	        qualities, ret = 0, math.inf  
	          
	        for ratio, (w, q) in sorted(ratios):  
	            qualities += q  
	            workers.add(q)  
	              
	            if len(workers) > K:  
	                qualities -= workers.pop(-1)  
	              
	            if len(workers) == K:  
	                ret = min(ret, qualities * ratio)  
	          
	        return ret  
	```

- 1383. Maximum Performance of a Team

	```python  
	from sortedcontainers import SortedList  
	class Solution:  
	    def maxPerformance(self, n: int, speed: List[int], efficiency: List[int], k: int) -> int:  
	        workers, MOD = SortedList(), 10 ** 9 + 7  
	          
	        ret = ss = 0  
	        for e, s in sorted(zip(efficiency, speed), reverse=True):  
	            workers.add(s)  
	            ss += s  
	              
	            if len(workers) > k:  
	                ss -= workers.pop(0)  
	              
	            ret = max(ret, e * ss)  
	          
	        return ret % MOD  
	```

### Binary search

> Ideal  

1. Binary search can be used to guess answer in a known range.  

Leverage library if it is available.  
 - Python: `bisect.bisect_left`, `bisect.bisect_right`  
 - C++: `lower_bound`, `upper_bound`

- 635. Design Log Storage System

	```python  
	class LogSystem:  
	
	    def __init__(self):  
	        self.data = []  
	
	    def put(self, id: int, timestamp: str) -> None:  
	        bisect.insort_left(self.data, (timestamp, id))  
	
	    def retrieve(self, s: str, e: str, gra: str) -> List[int]:  
	        gra_to_idx = {  
	            'Year': 4,  
	            'Month': 7,  
	            'Day': 10,  
	            'Hour': 13,  
	            'Minute': 16,  
	            'Second': 19  
	        }  
	        s = s[:gra_to_idx[gra]]  
	        e = e[:gra_to_idx[gra]]+':'+'9'*32  
	
	        idx1, idx2 = bisect.bisect_left(self.data, (s, -math.inf)), bisect.bisect(self.data, (e, math.inf))  
	        return [item[1] for item in self.data[idx1:idx2]]  
	```

- 327. Count of Range Sum

	```python  
	from sortedcontainers import SortedList  
	class Solution:  
	    def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:  
	        pre_sum, sums = 0, SortedList([0])  
	        ret = 0  
	        for num in nums:  
	            pre_sum += num  
	            # print(sums)  
	            # lower <= pre_sum - x <= upper  
	            # pre_sum - lower >= x >= pre_sum - upper  
	            ret += sums.bisect_right(pre_sum - lower) - sums.bisect_left(pre_sum - upper)  
	            sums.add(pre_sum)  
	        return ret  
	```

- 410. Split Array Largest Sum

	Guess answer by using binary search  
	
	```python  
	class Solution:  
	    def splitArray(self, nums: List[int], m: int) -> int:  
	        def valid_sum(max_sum):  
	            cnt, cur = 1, 0  
	            for num in nums:  
	                cur += num  
	                if cur > max_sum:  
	                    cnt += 1  
	                    cur = num  
	                    if cnt > m:  
	                        return False  
	            return True  
	        # Binary search  
	        l, r = max(nums), sum(nums)  
	        while l < r:  
	            mid = (l+r) // 2  
	            if valid_sum(mid):  
	                r = mid  
	            else:  
	                l = mid+1  
	        return l  
	```

- 4. Median of Two Sorted Arrays

	```python  
	class Solution:  
	    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:  
	        if len(nums1) > len(nums2):  
	            nums1, nums2 = nums2, nums1  
	              
	        m, n = len(nums1), len(nums2)  
	        l, r, half = 0, m, (m+n) // 2  
	          
	        while l <= r:  
	            mid = (l+r) // 2  
	            l1, r1 = nums1[mid-1] if mid-1>=0 else -math.inf, nums1[mid] if mid<m else math.inf  
	            size_2 = half-mid  
	            l2, r2 = nums2[size_2-1] if size_2-1 >= 0 else -math.inf, nums2[size_2] if size_2 < n else math.inf  
	              
	            if l1 > r2:  
	                r = mid  
	            elif l2 > r1:  
	                l = mid + 1  
	            else:  
	                if (m+n) % 2:  
	                    return min(r1, r2)  
	                else:  
	                    return (max(l1,l2) + min(r1,r2)) / 2  
	          
	        return 0  
	```

- 1060. Missing Element in Sorted Array

	```python  
	class Solution:  
	    def missingElement(self, nums: List[int], k: int) -> int:  
	        '''  
	        prev = nums[0]-1  
	        for val in nums:  
	            if k <= val - prev - 1:  
	                return prev + k  
	            else:  
	                k -= val - prev - 1  
	                prev = val  
	        return prev + k  
	        '''  
	        def count_space(idx):  
	            return nums[idx] - nums[0] - 1 - (idx - 1) # 2 4 7  
	          
	        l, r = 0, len(nums)-1  
	        while l < r:  
	            mid = (l+r) // 2  
	            space = count_space(mid)  
	            if space >= k:  
	                r = mid  
	            else:  
	                l = mid + 1  
	        if count_space(l) >= k:  
	            l -= 1  
	        return nums[l] + k - count_space(l)  
	```

- 5455. Minimum Number of Days to Make m Bouquets

	```python  
	class Solution:  
	    def minDays(self, B: List[int], m: int, k: int) -> int:  
	        def ok(day):  
	            fl = 0  
	            cnt = 0  
	            for d in B:  
	                fl = fl + 1 if day >= d else 0  
	                if fl >= k:  
	                    cnt += 1  
	                    fl = 0  
	            return cnt >= m  
	
	        l, r = min(B), max(B)+1  
	        while l < r:  
	            #print(f'{l} {r}')  
	            mid = (l+r) // 2  
	            if ok(mid):  
	                r = mid  
	            else:  
	                l = mid + 1  
	        return l if l <= max(B) else -1  
	```

- 1146. Snapshot Array

- 1146. Snapshot Array

	```python  
	class SnapshotArray:  
	
	    def __init__(self, length: int):  
	        self.d = defaultdict(list)  
	        for i in range(length):  
	            self.d[i].append((0, 0))  
	        self.v = 0  
	
	    def set(self, index: int, val: int) -> None:  
	        self.d[index].append((self.v, val))  
	
	    def snap(self) -> int:  
	        self.v += 1  
	        return self.v - 1  
	
	    def get(self, index: int, snap_id: int) -> int:  
	        idx = bisect.bisect(self.d[index], (snap_id, float'inf')) - 1  
	        return self.d[index][idx][1]  
	```

- 1231. Divide Chocolate

	```python  
	class Solution:  
	    def maximizeSweetness(self, sweetness: List[int], K: int) -> int:  
	        def can(size):  
	            cnt, cur = 0, 0  
	            for val in sweetness:  
	                cur += val  
	                if cur >= size:  
	                    cnt += 1  
	                    cur = 0  
	            return cnt >= K+1  
	          
	        l, r = 0, sum(sweetness)  
	        while l < r:  
	            mid = (l+r) // 2  
	            if can(mid):  
	                l = mid + 1  
	            else:  
	                r = mid  
	        return l if can(l) else l-1  
	```

- 240. Search a 2D Matrix II

	```python  
	class Solution:  
	    def searchMatrix(self, matrix, target):  
	        """  
	        :type matrix: List[List[int]]  
	        :type target: int  
	        :rtype: bool  
	        """  
	        if not matrix or not matrix[0]: return False  
	        m, n = len(matrix), len(matrix[0])  
	        x, y = 0, n-1  
	        while 0 <= x < m and 0 <= y < n:  
	            if matrix[x][y] == target:  
	                return True  
	            if matrix[x][y] < target:  
	                x += 1  
	            else:  
	                y -= 1  
	        return False  
	```

### KMP

- 214. Shortest Palindrome

	214. Shortest Palindrome

### stack

[https://en.wikipedia.org/wiki/Stack_(abstract_data_type)](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))

O(1) to push and pop at end.

- 388. Longest Absolute File Path

	```python  
	class Solution:  
	    def lengthLongestPath(self, input: str) -> int:  
	        ret, stack, cur = 0, [], 0  
	          
	        for line in input.split('\n'):  
	            depth = line.count('\t')  
	            pattern = line.lstrip('\t')  
	              
	            while depth < len(stack):  
	                cur -= len(stack.pop()) + 1  
	              
	            if '.' in line:  
	                ret = max(ret, cur + len(pattern))  
	            else:  
	                stack.append(pattern)  
	                cur += 1 + len(pattern)  
	              
	        return ret  
	```

- 20. Valid Parentheses

	```python  
	class Solution:  
	    def isValid(self, s: str) -> bool:  
	        stack = []  
	        pairs = {'(': ')', '[': ']', '{': '}'}  
	        for c in s:  
	            if c in ['(', '[', '{']:  
	                stack.append(pairs[c])  
	            else:  
	                if stack and stack[-1] == c:  
	                    stack.pop()  
	                else:  
	                    return False  
	        return not stack  
	```

- 227. Basic Calculator II

	```python  
	class Solution:  
	    def calculate(self, s: str) -> int:  
	        s = s.strip().replace(' ', '')  
	        nums = []  
	        sign, val = '+', 0  
	        for i, c in enumerate(s):  
	            if c.isdigit():  
	                val = val*10 + int(c)  
	            if not c.isdigit() or i == len(s)-1:  
	                if sign == '+':  
	                    nums.append(val)  
	                elif sign == '-':  
	                    nums.append(-val)  
	                elif sign == '*':  
	                    nums.append(nums.pop() * val)  
	                elif sign == '/':  
	                    nums.append(int(nums.pop() / val))  
	                sign = c  
	                val = 0  
	        return sum(nums)  
	```

- 1249. Minimum Remove to Make Valid Parentheses

	```python  
	class Solution:  
	    def minRemoveToMakeValid(self, s: str) -> str:  
	        stack = []  
	        remove = set()  
	        for i, c in enumerate(s):  
	            if c == '(':  
	                stack.append(i)  
	            elif c == ')':  
	                if stack:  
	                    stack.pop()  
	                else:  
	                    remove.add(i)  
	        for i in stack:  
	            remove.add(i)  
	        return ''.join(c for i, c in enumerate(s) if i not in remove)  
	```

- 844. Backspace String Compare

	```python  
	class Solution:  
	    def backspaceCompare(self, S: str, T: str) -> bool:  
	        s, t = [], []  
	        for c in S:  
	            if c == '#':  
	                if s:  
	                    s.pop()  
	            else:  
	                s.append(c)  
	        for c in T:  
	            if c == '#':  
	                if t:  
	                    t.pop()  
	            else:  
	                t.append(c)  
	        return s == t  
	```

- 946. Validate Stack Sequences

	```python  
	class Solution:  
	    def validateStackSequences(self, pushed: List[int], popped: List[int]) -> bool:  
	        dq = deque(pushed)  
	        stack = []  
	        for val in popped:  
	            if stack and stack[-1] == val:  
	                stack.pop()  
	            else:  
	                while dq:  
	                    stack.append(dq.popleft())  
	                    if stack[-1] == val:  
	                        break  
	                if stack[-1] != val:  
	                    return False  
	                stack.pop()  
	        return not dq and not stack  
	```

- 856. Score of Parentheses

	https://leetcode.com/problems/score-of-parentheses/discuss/141777/C%2B%2BJavaPython-O(1)-Space

## Tree

Recursive! Recursive! Recursive!  

> pre/in/post order traversal   
https://yonglife.com/2019/05/04/binary-tree-traversal-updated/

> Recursive to Non-recursive   

- [437. Path Sum III]([https://leetcode.com/problems/path-sum-iii/discuss/721966/Python-Concise-Recursive-%2B-Non-recursive](https://leetcode.com/problems/path-sum-iii/discuss/721966/Python-Concise-Recursive-%2B-Non-recursive))
- [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/discuss/721668/Python-Concise-Recursive-%2B-Non-recursive)  
- [979. Distribute Coins in Binary Tree]([https://leetcode.com/problems/distribute-coins-in-binary-tree/discuss/719810/Python-Concise-Anyone-has-interest-in-non-recursive-implementation](https://leetcode.com/problems/distribute-coins-in-binary-tree/discuss/719810/Python-Concise-Anyone-has-interest-in-non-recursive-implementation))
- [297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/discuss/719519/python-concise-recursive-non-recursive)  
- [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/discuss/719416/python-concise-recursive-non-recursive)  
- [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/discuss/719653/Python-Concise-Recursive-%2B-Optimized-recursive-%2B-Non-recursive)  
- [110. Balanced Binary Tree]([https://leetcode.com/problems/balanced-binary-tree/discuss/721706/python-concise-recursive-non-recursive](https://leetcode.com/problems/balanced-binary-tree/discuss/721706/python-concise-recursive-non-recursive))
- [114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/discuss/721737/Python-Concise-Recursive-%2B-Non-recursive)

### DFS

- 606. Construct String from Binary Tree

	```python  
	# Definition for a binary tree node.  
	# class TreeNode:  
	#     def __init__(self, val=0, left=None, right=None):  
	#         self.val = val  
	#         self.left = left  
	#         self.right = right  
	class Solution:  
	    def tree2str(self, t: TreeNode) -> str:  
	        if t == None:  
	            return ''  
	        l, r = self.tree2str(t.left), self.tree2str(t.right)  
	        return f'{t.val}' + (f'({l})' if l or r else '') + (f'({r})' if r else '')        
	```

- 100. Same Tree

	```python  
	class Solution:  
	    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:  
	        '''  
	        # Recursive: Time O(N) Space O(N)  
	        if not p and not q: return True  
	        if not (p and q and p.val == q.val): return False  
	        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)  
	        '''  
	        # Non-recursive: Time O(N) Space O(N)  
	        stack = []  
	        while p or q or stack:  
	            while p or q:  
	                if not ((p and q) and p.val == q.val): return False  
	                stack.append((p.right, q.right))  
	                p, q = p.left, q.left  
	            p, q = stack.pop()  
	        return True  
	```

- 101. Symmetric Tree

	```python  
	class Solution:  
	    def isSymmetric(self, root: TreeNode) -> bool:  
	        '''  
	        # Recursive  
	        def dfs(a, b):  
	            if ((a is None) ^ ( b is None)) or (a and a.val != b.val): return False  
	            if not a: return True  
	            return dfs(a.left, b.right) and dfs(a.right, b.left)  
	        return dfs(root.left, root.right) if root else True  
	        '''  
	        # Non-recursive  
	        if not root: return True  
	        stack = [(root.left, root.right)]  
	        while stack:  
	            a, b = stack.pop()  
	            if (a is None) ^ (b is None): return False  
	            if a and a.val != b.val: return False  
	            if not a: continue  
	              
	            stack.append((a.left, b.right))  
	            stack.append((a.right, b.left))  
	        return True  
	```

- 996. Number of Squareful Arrays

	```python  
	class Solution:  
	    def numSquarefulPerms(self, A: List[int]) -> int:  
	        c = Counter(A)  
	        cand = {x: [y for y in c if (int((x+y)**0.5))**2 == (x+y)] for x in c}  
	        print(cand)  
	        def dfs(x, size=1):  
	            if size == len(A): return 1  
	            c[x] -= 1  
	            ret = sum(dfs(y, size+1) for y in cand[x] if c[y])  
	            c[x] += 1  
	            return ret  
	        return sum(map(dfs, c))  
	```

- 1462. Course Schedule IV

	```python  
	class Solution:  
	    def checkIfPrerequisite(self, n: int, E: List[List[int]], queries: List[List[int]]) -> List[bool]:  
	        pred = defaultdict(set)  
	        for u, v in E:  
	            pred[v].add(u)  
	        indirect_pred = deepcopy(pred)  
	        visited = set()  
	        def dfs(u):  
	            visited.add(u)  
	            for v in pred[u]:  
	                if v not in visited:  
	                    dfs(v)  
	                indirect_pred[u] |= indirect_pred[v]  
	        for i in range(n):  
	            dfs(i)  
	
	        return [u in indirect_pred[v] for u, v in queries]  
	```

- 110. Balanced Binary Tree

	https://leetcode.com/problems/balanced-binary-tree/discuss/721706/python-concise-recursive-non-recursive

- 241. Different Ways to Add Parentheses

	```python  
	class Solution:  
	    def diffWaysToCompute(self, input: str) -> List[int]:  
	        # a b c  
	        # (a b) c  
	        # a (b c)  
	        patterns = []  
	        i = 0  
	        while i < len(input):  
	            if not input[i].isdigit():  
	                patterns.append(input[i])  
	                i += 1  
	            else:  
	                j = i  
	                while j < len(input) and input[j].isdigit(): j += 1  
	                patterns.append(int(input[i:j]))  
	                i = j  
	        def cal(vl, op, vr):  
	            if op == '+': return vl+vr  
	            elif op == '-': return vl-vr  
	            elif op == '*': return vl*vr  
	            else:  
	                return None  
	        def get_vals(vl, op1, val, op2, vr):  
	            return [cal(cal(vl, op1, val), op2, vr), cal(vl, op1, cal(val, op2, vr))]  
	        def dfs(l, r):  
	            if r-l == 1: return [patterns[l]]  
	            else:  
	                ret = []  
	                for i in range(l+1, r, 2):  
	                    for vl in dfs(l, i):  
	                        for vr in dfs(i+1, r):  
	                            ret.append(cal(vl, patterns[i], vr))  
	            return ret  
	        return dfs(0, len(patterns))  
	```

- 1110. Delete Nodes And Return Forest

	```python  
	class Solution:  
	    def delNodes(self, root: TreeNode, to_delete: List[int]) -> List[TreeNode]:  
	        ret = []  
	        def dfs(cur, p):  
	            if not cur: return  
	            if cur.val in to_delete:  
	                if p and p.left == cur:  
	                    p.left = None  
	                if p and p.right == cur:  
	                    p.right = None  
	                if cur.left and cur.left.val not in to_delete:  
	                    ret.append(cur.left)  
	                if cur.right and cur.right.val not in to_delete:  
	                    ret.append(cur.right)  
	            dfs(cur.right, cur)  
	            dfs(cur.left, cur)  
	
	              
	        dfs(root, None)  
	        if root and root.val not in to_delete:  
	            ret.append(root)  
	        return ret  
	```

- 337. House Robber III

	```python  
	# Definition for a binary tree node.  
	# class TreeNode:  
	#     def __init__(self, val=0, left=None, right=None):  
	#         self.val = val  
	#         self.left = left  
	#         self.right = right  
	class Solution:  
	    def rob(self, root: TreeNode) -> int:  
	          
	        def dp(cur):  
	            if not cur:  
	                return (0, 0)  
	              
	            ls, ln = dp(cur.left)  
	            rs, rn = dp(cur.right)  
	              
	            return (cur.val + ln + rn, max(ls, ln) + max(rs, rn))  
	          
	        return max(dp(root))  
	```

- 173. Binary Search Tree Iterator

	```python  
	# Definition for a binary tree node.  
	# class TreeNode:  
	#     def __init__(self, val=0, left=None, right=None):  
	#         self.val = val  
	#         self.left = left  
	#         self.right = right  
	class BSTIterator:  
	
	    def __init__(self, root: TreeNode):  
	        self.stack = []  
	        self._next(root)  
	          
	    def _next(self, node):  
	        while node:  
	            self.stack.append(node)  
	            node = node.left  
	
	    def next(self) -> int:  
	        """  
	        @return the next smallest number  
	        """  
	        node = self.stack.pop()  
	        self._next(node.right)  
	        return node.val  
	
	
	    def hasNext(self) -> bool:  
	        """  
	        @return whether we have a next smallest number  
	        """  
	```

- 22. Generate Parentheses

	```python  
	class Solution:  
	    def generateParenthesis(self, n: int) -> List[str]:  
	        def dfs(l, r, s):  
	            if not l and not r:  
	                rst.append(s)  
	                return  
	            if l:  
	                dfs(l-1, r, s+'(')  
	            if l < r:  
	                dfs(l, r-1, s+')')  
	        rst = []  
	        dfs(n, n, '')  
	        return rst  
	
	```

- 426. Convert Binary Search Tree to Sorted Doubly Linked List

	```python  
	class Solution:  
	    def treeToDoublyList(self, root: 'Node') -> 'Node':  
	        if not root: return None  
	        def dfs(cur):  
	            if not cur.left and not cur.right: return cur, cur  
	            if cur.left:  
	                ll, lr = dfs(cur.left)  
	                lr.right, cur.left = cur, lr  
	            else:  
	                ll, lr = cur, cur  
	            if cur.right:  
	                rl, rr = dfs(cur.right)  
	                rl.left, cur.right = cur, rl  
	            else:  
	                rl, rr = cur, cur  
	            return ll, rr  
	        ll, rr = dfs(root)  
	        ll.left, rr.right = rr, ll  
	        return ll  
	```

- 113. Path Sum II

- 437. Path Sum III

	https://leetcode.com/problems/path-sum-iii/discuss/721966/Python-Concise-Recursive-%2B-Non-recursive

- 108. Convert Sorted Array to Binary Search Tree

	https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/discuss/719416/Python-Concise-Recursive-%2B-Non-recursive

- 105. Construct Binary Tree from Preorder and Inorder Traversal

	https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/discuss/719653/Python-Concise-Recursive-%2B-Optimized-recursive-%2B-Non-recursive

- 297. Serialize and Deserialize Binary Tree

	https://leetcode.com/problems/serialize-and-deserialize-binary-tree/discuss/719519/Python-Concise-Recursive-%2B-Non-recursive

- 489. Robot Room Cleaner

- 301. Remove Invalid Parentheses

	DFS is simple. It is only the matter of how many unnecessary subtree we can cut.  
	```python  
	class Solution:  
	    def removeInvalidParentheses(self, s: str) -> List[str]:  
	        # BFS Time: 2^N Space: 2^N  
	            l = 0  
	            for c in s:  
	                if c == '(':  
	                    l += 1  
	                elif c == ')':  
	                    l -= 1  
	                if l < 0: return False  
	            return l == 0  
	        q, nq = [(s, 0)], []  
	        rst = []  
	        while q:  
	            for cur in q:  
	                if is_valid(cur[0]):  
	                    rst.append(cur[0])  
	                else:  
	                    s, cur_idx = cur  
	                    for i in range(cur_idx, len(s)):  
	                        if i == cur_idx or s[i-1] != s[i]:  
	                            nq.append((s[:i]+s[i+1:], i))      
	            if rst:  
	                break  
	            q, nq = nq, []  
	        return rst  
	
	        '''  
	        # DFS Time: 2^N Space N  
	        rm_l, rm_r = 0, 0  
	        for c in s:  
	            if c == '(':  
	                rm_l += 1  
	            elif c == ')':  
	                if rm_l > 0:  
	                    rm_l -= 1  
	                else:  
	                    rm_r += 1  
	        def dfs(cur, idx, rm_l, rm_r, l):  
	            if idx == len(s) or rm_l < 0 or rm_r < 0 or l < 0:  
	                if rm_l == 0 and rm_r == 0 and l == 0:  
	                    rst.add(cur)  
	                return  
	            if s[idx] == '(':  
	                dfs(cur, idx+1, rm_l-1, rm_r, l)  
	                dfs(cur+s[idx], idx+1, rm_l, rm_r, l+1)  
	            elif s[idx] == ')':  
	                dfs(cur, idx+1, rm_l, rm_r-1, l)  
	                dfs(cur+s[idx], idx+1, rm_l, rm_r, l-1)  
	            else:  
	                dfs(cur+s[idx], idx+1, rm_l, rm_r, l)  
	        rst = set()  
	        dfs('', 0, rm_l, rm_r, 0)  
	        return list(rst) if rst else [""]  
	        '''  
	```

- 617. Merge Two Binary Trees

	https://leetcode.com/problems/merge-two-binary-trees/discuss/718497/Python-Concise-Recursive-%2B-Non-recursive

### BFS

- 841. Keys and Rooms

	```python  
	class Solution:  
	    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:  
	        q = [0]  
	        visited = set()  
	        while q:  
	            u = q.pop()  
	            visited.add(u)  
	            for v in rooms[u]:  
	                if v not in visited:  
	                    q.append(v)  
	          
	        return len(visited) == len(rooms)  
	```

- 102. Binary Tree Level Order Traversal

	```python  
	# Definition for a binary tree node.  
	# class TreeNode:  
	#     def __init__(self, val=0, left=None, right=None):  
	#         self.val = val  
	#         self.left = left  
	#         self.right = right  
	class Solution:  
	    def levelOrder(self, root: TreeNode) -> List[List[int]]:  
	        if not root: return []  
	        '''  
	        ret, level, q, nq = [], [], deque([root]), deque()  
	        while q:  
	            cur = q.popleft()  
	            level.append(cur.val)  
	              
	            if cur.left: nq.append(cur.left)  
	            if cur.right: nq.append(cur.right)  
	              
	            if not q:  
	                q, nq = nq, deque()  
	                ret.append(level)  
	                level = []  
	        return ret  
	        '''  
	        ret, level, q, cnt = [], [], deque([root]), 1  
	        while q:  
	            cur = q.popleft()  
	            level.append(cur.val)  
	            cnt -= 1  
	              
	            if cur.left: q.append(cur.left)  
	            if cur.right: q.append(cur.right)  
	              
	            if cnt == 0:  
	                ret.append(level)  
	                level, cnt = [], len(q)  
	                  
	        return ret  
	```

- 199. Binary Tree Right Side View

	```python  
	class Solution:  
	    def rightSideView(self, root: TreeNode) -> List[int]:  
	        if not root: return []  
	        q, nq, ret = deque([root]), deque(), [root.val]  
	        while q:  
	            cur = q.popleft()  
	            if cur.left: nq.append(cur.left)  
	            if cur.right: nq.append(cur.right)  
	              
	            if not q and nq:  
	                ret.append(nq[-1].val)  
	                q, nq = nq, deque()  
	        return ret  
	```

- 301. Remove Invalid Parentheses

- 126. Word Ladder II

	https://leetcode.com/problems/word-ladder-ii/discuss/269012/Python-BFS%2BBacktrack-Greatly-Improved-by-bi-directional-BFS

- 279. Perfect Squares

	```python  
	class Solution:  
	    def numSquares(self, n: int) -> int:  
	        if n <= 2: return n  
	        square_table = [i*i for i in range(1, int(n**0.5)+1)]  
	        q, nq = [n], []  
	        rst = 0  
	        while q:  
	            rst += 1  
	            for x in q:  
	                for i in square_table:  
	                    if i == x:  
	                        return rst  
	                    elif i > x:  
	                        break  
	                    nq.append(x-i)  
	            q, nq = nq, []  
	        return rst  
	```

- 854. K-Similar Strings

	```python  
	class Solution:  
	    def kSimilarity(self, A: str, B: str) -> int:  
	        def neis(s):  
	            i = 0  
	            while s[i] == B[i]: i+= 1  
	            ret = []  
	            for j in range(i+1, len(A)):  
	                if s[j] == B[i]:  
	                    cur = list(s)  
	                    cur[i], cur[j] = cur[j], cur[i]  
	                    yield ''.join(cur)  
	        q, visited = [(A, 0)], set()  
	        for cand, move in q:  
	            if cand == B: return move  
	            for nei in neis(cand):  
	                if nei not in visited:  
	                    visited.add(nei), q.append((nei, move+1))  
	```

- 785. Is Graph Bipartite?

	```python  
	class Solution:  
	    def isBipartite(self, graph: List[List[int]]) -> bool:  
	        '''  
	        # DFS  
	        sides = {}  
	        def dfs(u):  
	            if u not in sides:  
	                sides[u] = 0  
	            for v in graph[u]:  
	                if v in sides:  
	                    if sides[v] == sides[u]:  
	                        return False  
	                    continue  
	                sides[v] = 1 - sides[u]  
	                if not dfs(v):  
	                    return False  
	            return True  
	        return all(dfs(i) for i in range(len(graph)))  
	        '''  
	        # BFS  
	        def bfs(u):  
	            sides = {u: 0}  
	            q = deque([u])  
	            while q:  
	                u = q.pop()  
	                for v in graph[u]:  
	                    if v in sides:  
	                        if sides[v] == sides[u]:  
	                            return False  
	                        continue  
	                    sides[v] = 1 - sides[u]  
	                    q.append(v)  
	            return True  
	        return all(bfs(u) for u in range(len(graph)))  
	```

- 1376. Time Needed to Inform All Employees

	```python  
	class Solution:  
	    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:  
	        q, ret = deque([(headID, 0)]), 0  
	          
	        graph = defaultdict(set)  
	        for i, val in enumerate(manager):  
	            graph[val].add(i)  
	          
	        while q:  
	            cur, now = q.popleft()  
	            ret = max(ret, now)  
	              
	            for nxt in graph[cur]:  
	                q.append((nxt, now+informTime[cur]))  
	                  
	        return ret  
	```

- 752. Open the Lock

	```python  
	class Solution:  
	    def openLock(self, deadends: List[str], target: str) -> int:  
	        if '0000' in deadends: return -1  
	        deadends = set(deadends)  
	        q, nq, visited, step = deque(['0000']), deque(), set(['0000']), 0  
	          
	        while q:  
	            cur = q.popleft()  
	            if cur == target:  
	                return step  
	                  
	            for i in range(len(cur)):  
	                val = int(cur[i])  
	                for k in [(val-1)%10, (val+1)%10]:  
	                    nxt = cur[:i] + str(k) + cur[i+1:]  
	                    if nxt in deadends or nxt in visited: continue  
	                    nq.append(nxt)  
	                    visited.add(nxt)  
	              
	            if not q:  
	                q, nq = nq, deque()  
	                step += 1  
	          
	        return -1            
	```

- 1293. Shortest Path in a Grid with Obstacles Elimination

	```python  
	class Solution:  
	    def shortestPath(self, grid: List[List[int]], k: int) -> int:  
	        if not grid:  
	            return -1  
	        m, n = len(grid), len(grid[0])  
	        visited = defaultdict(int)  
	
	        q, nq, step = deque([(0, 0, k)]), deque(), 0  
	          
	        while q:  
	            x, y, chance = q.popleft()  
	              
	            if (x, y) == (m-1, n-1):  
	                return step  
	              
	            for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:  
	                xx, yy = x+dx, y+dy  
	                if 0 <= xx < m and 0 <= yy < n:  
	                    chance_left = chance - grid[xx][yy]  
	                    if chance_left < 0: continue  
	                    if (xx, yy) not in visited or visited[(xx,yy)] < chance_left:  
	                        visited[(xx, yy)] = chance_left  
	                        nq.append((xx, yy, chance_left))  
	              
	            if not q:  
	                q, nq = nq, deque()  
	                step += 1  
	          
	        return -1  
	```

- 1345. Jump Game IV

	```python  
	class Solution:  
	    def minJumps(self, arr: List[int]) -> int:  
	        # BFS  
	        q, nq, visited, move = deque([0]), deque(), set([0]), 0  
	        val2idx = defaultdict(list)  
	          
	        for i, val in enumerate(arr):  
	            val2idx[val].append(i)  
	              
	        while q:  
	            cur = q.popleft()  
	            if cur == len(arr)-1:  
	                return move  
	              
	            for nxt in [cur-1, cur+1] + val2idx[arr[cur]]:  
	                if (not 0 <= nxt < len(arr)) or nxt in visited: continue  
	                nq.append(nxt)  
	                visited.add(nxt)  
	              
	            val2idx[arr[cur]] = []  
	            if not q:  
	                q, nq = nq, q  
	                move += 1  
	          
	        return None  
	```

- 1368. Minimum Cost to Make at Least One Valid Path in a Grid

### Trie

> Typical implementation  
```python  
class TreeNode:  
    def __init__(self):  
        self.word = None  
        self.next = defaultdict(TreeNode)  
          
class Trie:  

    def __init__(self):  
        self.root = TreeNode()  
          
    def insert(self, word: str) -> None:  
        cur = self.root  
        for c in word:  
            cur = cur.next[c]  
        cur.word = word  
          

    def search(self, word: str) -> bool:  
        cur = self.root  
        for c in word:  
            if c not in cur.next: return False  
            cur = cur.next[c]  
        return cur.word  
```  

> Note  

1. Consider build trie in reversed order if the characters are given in reversed order.

- 1065. Index Pairs of a String

	```python  
	class TreeNode:  
	    def __init__(self):  
	        self.word = None  
	        self.next = defaultdict(TreeNode)  
	
	class Trie:  
	    def __init__(self):  
	        self.root = TreeNode()  
	      
	    def add(self, word):  
	        cur = self.root  
	        for c in word:  
	            cur = cur.next[c]  
	        cur.word = word       
	
	class Solution:  
	    def indexPairs(self, text: str, words: List[str]) -> List[List[int]]:  
	        trie = Trie()  
	        for word in words:  
	            trie.add(word)  
	        ret = []  
	        for i in range(len(text)):  
	            cur = trie.root  
	            j = i  
	            while j < len(text):  
	                if text[j] not in cur.next: break   
	                cur = cur.next[text[j]]  
	                if cur.word: ret.append([i, j])  
	                j += 1  
	        return ret  
	```

- 208. Implement Trie (Prefix Tree)

	```python  
	class TreeNode:  
	    def __init__(self):  
	        self.word = None  
	        self.next = defaultdict(TreeNode)  
	          
	class Trie:  
	
	    def __init__(self):  
	        self.root = TreeNode()  
	          
	
	    def insert(self, word: str) -> None:  
	        cur = self.root  
	        for c in word:  
	            cur = cur.next[c]  
	        cur.word = word  
	          
	
	    def search(self, word: str) -> bool:  
	        cur = self.root  
	        for c in word:  
	            if c not in cur.next: return False  
	            cur = cur.next[c]  
	        return cur.word  
	          
	          
	
	    def startsWith(self, prefix: str) -> bool:  
	        cur = self.root  
	        for c in prefix:  
	            if c not in cur.next: return False  
	            cur = cur.next[c]  
	        return True  
	```

- 1023. Camelcase Matching

	```python  
	class TreeNode:  
	    def __init__(self):  
	        self.word, self.next = None, defaultdict(TreeNode)  
	
	class Trie:  
	    def __init__(self):  
	        self.root = TreeNode()  
	      
	    def add(self, word):  
	        cur = self.root  
	        for c in word:  
	            cur = cur.next[c]  
	        cur.word = word  
	      
	    def search(self, word):  
	        cur = self.root  
	        for c in word:  
	            if c not in cur.next:  
	                if c.lower() != c: return False  
	            else:  
	                cur = cur.next[c]  
	        return bool(cur.word)  
	              
	class Solution:  
	    def camelMatch(self, queries: List[str], pattern: str) -> List[bool]:  
	        ret, trie = [], Trie()  
	        trie.add(pattern)  
	        for q in queries:  
	            ret.append(trie.search(q))  
	        return ret  
	```

- 1268. Search Suggestions System

	```python  
	class Node:  
	    def __init__(self):  
	        self.words = []  
	        self.next = defaultdict(Node)  
	class Solution:  
	    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:  
	        products = sorted(products)  
	        tries = Node()  
	        for product in products:  
	            cur = tries  
	            for c in product:  
	                cur = cur.next[c]  
	                cur.words.append(product)  
	        ret, cur = [], tries  
	        for c in searchWord:  
	            cur = cur.next[c]  
	            ret.append(cur.words[:3])  
	        return ret  
	```

- 745. Prefix and Suffix Search

	```python  
	class TreeNode:  
	    def __init__(self):  
	        self.words = set()  
	        self.next = defaultdict(TreeNode)  
	
	class Trie:  
	    def __init__(self):  
	        self.root = TreeNode()  
	      
	    def add(self, word, reversed=False):  
	        cur, val = self.root, word if not reversed else word[::-1]  
	        cur.words.add(val)  
	        for c in word:  
	            cur = cur.next[c]  
	            cur.words.add(val)  
	              
	    def search(self, word):  
	        cur = self.root  
	        for c in word:  
	            if c not in cur.next: return set()  
	            cur = cur.next[c]  
	        return cur.words  
	          
	class WordFilter:  
	
	    def __init__(self, words: List[str]):  
	        self.pre, self.post = Trie(), Trie()  
	        self.weight = {word: i for i, word in enumerate(words)}  
	        for w in words:  
	            self.pre.add(w)  
	            self.post.add(w[::-1], reversed=True)  
	
	    def f(self, prefix: str, suffix: str) -> int:  
	        cands = list(self.pre.search(prefix) & self.post.search(suffix[::-1]))  
	        cands = sorted(cands, key = lambda x: self.weight[x])  
	          
	        return self.weight[cands[-1]] if cands else -1  
	```

- 648. Replace Words

	```python  
	class Trie:  
	    def __init__(self):  
	        T = lambda: defaultdict(T)  
	        self.root = T()  
	      
	    def add(self, word):  
	        cur = self.root  
	        for c in word:  
	            cur = cur[c]  
	        cur['$'] = word  
	
	    def replace(self, word):  
	        cur = self.root  
	        for c in word:  
	            if '$' in cur: return cur['$']  
	            if c not in cur: return word  
	            cur = cur[c]  
	        return word  
	          
	class Solution:  
	    def replaceWords(self, words: List[str], sentence: str) -> str:  
	        trie = Trie()  
	        for w in words:  
	            trie.add(w)  
	        return ' '.join(trie.replace(word) for word in sentence.split())        
	```

- 425. Word Squares

	```python  
	class TreeNode:  
	    def __init__(self):  
	        self.words = []  
	        self.next = defaultdict(TreeNode)  
	          
	class Trie:  
	    def __init__(self):  
	        self.root = TreeNode()  
	      
	    def add(self, word):  
	        cur = self.root  
	        for c in word:  
	            cur = cur.next[c]  
	            cur.words.append(word)  
	          
	    def search(self, word):  
	        cur = self.root  
	        for c in word:  
	            cur = cur.next[c]  
	        return cur.words  
	
	class Solution:  
	    def wordSquares(self, words: List[str]) -> List[List[str]]:  
	        def dfs(seq):  
	            if len(seq) == len(seq[0]):   
	                ret.append(list(seq))  
	                return  
	            idx = len(seq)  
	            for cand in trie.search(''.join(row[idx] for row in seq)):  
	                seq.append(cand)  
	                dfs(seq)  
	                seq.pop()  
	                  
	        trie, ret = Trie(), []  
	        for w in words:  
	            trie.add(w)  
	          
	        for i, w in enumerate(words):  
	            seq = [w]  
	            dfs(seq)  
	        return ret  
	```

### Segment Tree

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

- 307. Range Sum Query - Mutable

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
	          
	class NumArray:  
	
	    def __init__(self, nums: List[int]):  
	        self.nums = nums  
	        self.stree = STree(nums)  
	
	    def update(self, i: int, val: int) -> None:  
	        self.stree.update(i, val - self.nums[i])  
	        self.nums[i] = val  
	
	    def sumRange(self, i: int, j: int) -> int:  
	        return self.stree.sum(i, j)  
	```

### Binary Index Tree

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

- 1505. Minimum Possible Integer After at Most K Adjacent Swaps On Digits

- 218. The Skyline Problem

	```python  
	from sortedcontainers import SortedList  
	
	class Solution:  
	    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:  
	        heights = [0] * len(buildings) * 2  
	        for i, (l, r, h) in enumerate(buildings):  
	            heights[i*2] = (l, 0, -h) # add  
	            heights[i*2+1] = (r, 1, h) # remove  
	        heights = sorted(heights)  
	          
	        ret, hs = [(-1, -math.inf)], SortedList([0])  
	        for idx, side, h in heights:  
	            if side == 0:  
	                hs.add(-h)  
	            else:  
	                hs.remove(h)  
	              
	            if hs[-1] != ret[-1][1]:  
	                ret.append((idx, hs[-1]))  
	        return ret[1:]  
	```

- 315. Count of Smaller Numbers After Self

	```python  
	from sortedcontainers import SortedList  
	class Solution:  
	    def countSmaller(self, nums: List[int]) -> List[int]:  
	        vals = SortedList()  
	        ret = [None] * len(nums)  
	        for i in range(len(nums))[::-1]:  
	            val = nums[i]  
	            idx = vals.bisect_left(val)  
	            ret[i] = idx  
	            vals.add(val)  
	        return ret  
	```  
	
	```python  
	class BIT:  
	    def __init__(self, size):  
	        self.arr = [0] * size  
	      
	    def add(self, x, delta):  
	        while x < len(self.arr):  
	            self.arr[x] += delta  
	            x += x & (-x)  
	
	    def sum(self, x):  
	        ret = 0  
	        while x:  
	            ret += self.arr[x]  
	            x -= x & (-x)  
	        return ret  
	              
	
	class Solution:  
	    def countSmaller(self, nums: List[int]) -> List[int]:  
	        if not nums: return []  
	        counter = Counter(nums)  
	        rank = {}  
	        for i, val in enumerate(sorted(counter.keys()), 1):  
	            rank[val] = i  
	        bit = BIT(len(rank))  
	        ret = [None] * len(nums)  
	        for i in range(len(nums))[::-1]:  
	            val = nums[i]  
	            ret[i] = bit.sum(rank[val]-1)  
	            bit.add(rank[val], 1)  
	        return ret  
	```

- 307. Range Sum Query - Mutable

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
	
	class NumArray:  
	
	    def __init__(self, nums: List[int]):  
	        self.nums = nums  
	        self.bit = BIT(len(nums))  
	        for i, num in enumerate(nums):  
	            self.bit.update(i, num)  
	
	    def update(self, i: int, val: int) -> None:  
	        self.bit.update(i, val - self.nums[i])  
	        self.nums[i] = val  
	
	    def sumRange(self, i: int, j: int) -> int:  
	        return self.bit.sum(j) - self.bit.sum(i-1)  
	```

### Binary Lifting

- 5456. Kth Ancestor of a Tree Node

## Graph


- 310. Minimum Height Trees

	```python  
	class Solution:  
	    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:  
	        graph = defaultdict(set)  
	        for u, v in edges:  
	            graph[u].add(v)  
	            graph[v].add(u)  
	          
	        leaves = [i for i in range(n) if len(graph[i]) <= 1]  
	        while n > 2:  
	            n -= len(leaves)  
	            nl = []  
	            for u in leaves:  
	                for v in graph[u]:  
	                    graph[v].remove(u)  
	                    if len(graph[v]) == 1:  
	                        nl.append(v)  
	            leaves = nl  
	        return leaves  
	```

- 685. Redundant Connection II

	```python  
	class Solution:  
	    def findRedundantDirectedConnection(self, edges: List[List[int]]) -> List[int]:  
	        def helper(edges, skip):  
	            uf = {}  
	            def find(x):  
	                uf.setdefault(x, x)  
	                if x != uf[x]: uf[x] = find(uf[x])  
	                return uf[x]  
	            def union(x, y):  
	                uf[find(x)] = uf[find(y)]  
	
	            ret = None  
	            for idx, (u, v) in enumerate(edges):  
	                if idx == skip: continue  
	                if find(u) == find(v):  
	                    return [u, v]  
	                union(u, v)  
	            return []  
	        prev, cand = {}, []  
	        for i, (u, v) in enumerate(edges):  
	            if v in prev:  
	                cand = [prev[v], i]  
	                break  
	            prev[v] = i  
	              
	        if not cand: return helper(edges, -1)  
	        else:  
	            print(cand)  
	            if helper(edges, cand[1]):  
	                print(2)  
	                return edges[cand[0]]  
	            return edges[cand[1]]  
	```

- 1059. All Paths from Source Lead to Destination

- 684. Redundant Connection

	## Key observation - What is a tree  
	1. Each node can has at most 1 parent. Root does not have a parent  
	2. No cycle  
	
	```python  
	class Solution:  
	    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:  
	        '''  
	        graph = defaultdict(dict)  
	        for i, (u, v) in enumerate(edges):  
	            graph[u][v] = i  
	            graph[v][u] = i  
	          
	        removed = set()  
	        q = [u for u in graph if len(graph[u]) == 1]  
	        while q:  
	            u = q.pop()  
	            v, idx = graph[u].popitem()  
	            removed.add(idx)  
	
	            del graph[v][u]  
	            if len(graph[v]) == 1:  
	                q.append(v)  
	          
	        return edges[max(i for i, edge in enumerate(edges) if i not in removed)]  
	        '''  
	        uf = {}  
	        def find(x):  
	            uf.setdefault(x, x)  
	            if x != uf[x]: uf[x] = find(uf[x])  
	            return uf[x]  
	        def union(x, y):  
	            uf[find(x)] = uf[find(y)]  
	          
	        ret = None  
	        for u, v in edges:  
	            if find(u) == find(v):  
	                return [u, v]  
	            union(u, v)  
	```

### Cycle Detection

https://yonglife.com/2020/08/22/Detect-Cycle-in-a-Graph/

### Euler path

```python
class Solution:  
    def EulerPath(self, tickets: List[List[str]]) -> List[str]:  
        graph = defaultdict(list)  
        for a, b in ticket:  
            graph[a].append(b)  
          
        ret = []  
        def dfs(cur):  
            while graph[cur]:  
                nxt = graph[cur].pop()  
                dfs(nxt)  
            ret.append(cur)  
        dfs('JFK')  
        return ret[::-1]
```

- 332. Reconstruct Itinerary

	```python  
	class Solution:  
	    def findItinerary(self, tickets: List[List[str]]) -> List[str]:  
	        graph = defaultdict(list)  
	        for a, b in sorted(tickets)[::-1]:  
	            graph[a].append(b)  
	          
	        ret = []  
	        def dfs(cur):  
	            while graph[cur]:  
	                nxt = graph[cur].pop()  
	                dfs(nxt)  
	            ret.append(cur)  
	        dfs('JFK')  
	        return ret[::-1]  
	```

### Topologic sort

```python  
def topo_sort(n: int, edges: List[List[int]]):  
    '''  
    Args:  
      n: graph contains vertex 0, 1, 2, ..... n-1  
      edges: [[u, v], [u, v], ....]  
    '''  
    succ, pred = defaultdict(set), defaultdict(set)  
    for u, v in edges:  
        succ[u].add(v)  
        pred[v].add(u)  
    ret, q = [], [u for u in range(n) if len(pred[u]) == 0]  
    while q:  
        u = q.pop()  
        ret.append(u)  

        for v in succ[u]:  
            pred[v].remove(u)  
            if not pred[v]:  
                q.append(v)  
      
    if len(ret) != n+1:  
        return []  
    return ret  
```

- 207. Course Schedule

	```python  
	class Solution:  
	    def canFinish(self, numCourses: int, P: List[List[int]]) -> bool:  
	        graph = defaultdict(list)  
	        indegree = Counter()  
	        for a, b in P:  
	            graph[b].append(a)  
	            indegree[a] += 1  
	        ret, q = [], [i for i in range(numCourses) if indegree[i] == 0]  
	        # BFS  
	        while q:  
	            ret.append(q.pop())  
	            for nxt in graph[ret[-1]]:  
	                indegree[nxt] -= 1  
	                if indegree[nxt] == 0:  
	                    q.append(nxt)  
	        return len(ret) == numCourses  
	```

- 802. Find Eventual Safe States

	```python  
	class Solution:  
	    def eventualSafeNodes(self, POINTS: List[List[int]]) -> List[int]:  
	        graph = defaultdict(set)  
	        degree = Counter()  
	        for u, nxt in enumerate(POINTS):  
	            for v in nxt:  
	                graph[v].add(u)  
	            degree[u] = len(nxt)  
	          
	        q = [i for i in range(len(POINTS)) if degree[i] == 0]  
	        ret = []  
	        while q:  
	            u = q.pop()  
	            ret.append(u)  
	            for v in graph[u]:  
	                degree[v] -= 1  
	                if degree[v] == 0:  
	                    q.append(v)  
	        return sorted(ret)  
	```

- 210. Course Schedule II

	```python  
	class Solution:  
	    def findOrder(self, N: int, P: List[List[int]]) -> List[int]:  
	        graph = defaultdict(list)  
	        degree = Counter()  
	        for a, b in P:  
	            degree[a] += 1  
	            graph[b].append(a)  
	        q = deque([i for i in range(N) if degree[i] == 0])  
	        ret = []  
	        while q:  
	            c = q.popleft()  
	            ret.append(c)  
	            for nxt in graph[c]:  
	                degree[nxt] -= 1  
	                if degree[nxt] == 0:  
	                    q.append(nxt)  
	        return ret if len(ret) == N else []  
	```

- 1048. Longest String Chain

	```python  
	class Solution:  
	    def longestStrChain(self, words: List[str]) -> int:  
	        words_set = set(words)  
	        prev, next = defaultdict(set), defaultdict(set)  
	        for word in words:  
	            for i in range(len(word)+1):  
	                for c in string.ascii_lowercase:  
	                    nw = word[:i] + c + word[i:]  
	                    if nw in words_set:  
	                        next[word].add(nw)  
	                        prev[nw].add(word)  
	        ret = 0  
	        pq = [(1, word) for word in words if len(next[word]) == 0]  
	        dist = defaultdict(int)  
	        while pq:  
	            size, word = pq.pop()  
	            ret = max(ret, size)  
	            for pw in prev[word]:  
	                next[pw].remove(word)  
	                dist[pw] = max(dist[pw], size+1)  
	                if len(next[pw]) == 0:  
	                    pq.append((max(dist[pw], size+1), pw))  
	        return ret  
	```

- 329. Longest Increasing Path in a Matrix

	```python  
	class Solution:  
	    def longestIncreasingPath(self, M: List[List[int]]) -> int:  
	        prev, next = defaultdict(set), defaultdict(set)  
	        if not M or not M[0]: return 0  
	        m, n = len(M), len(M[0])  
	        for i in range(m):  
	            for j in range(n):  
	                for x, y in [(-1, 0), (1, 0), (0, -1), (0, 1)]:  
	                    r, c = i+x, j+y  
	                    if not (0 <= r < m and 0 <= c < n): continue  
	                    if M[i][j] < M[r][c]:  
	                        next[(i, j)].add((r, c))  
	                        prev[(r, c)].add((i, j))  
	        pq = [(point, 1) for point in prev if len(next[point]) == 0]  
	        if not pq: return 1  
	        dist = defaultdict(lambda: 1)  
	        for (point, size) in pq:              
	            for pre in prev[point]:  
	                dist[pre] = max(dist[pre], size+1)  
	                next[pre].remove(point)  
	                if len(next[pre]) == 0:  
	                    pq.append((pre, dist[pre]))  
	
	        return max(dist.values())  
	```

- 1203. Sort Items by Groups Respecting Dependencies

	```python  
	class Solution:  
	    def sortItems(self, n: int, m: int, group: List[int], beforeItems: List[List[int]]) -> List[int]:  
	        def topo_sort(vertexs, succ, pre):  
	            q = [v for v in vertexs if len(pre[v]) == 0]  
	            ret = []  
	            while q:  
	                u = q.pop()  
	                ret.append(u)          
	                for v in succ[u]:  
	                    pre[v].remove(u)  
	                    if not pre[v]:  
	                        q.append(v)  
	            if len(ret) != len(vertexs):  
	                return []  
	            return ret  
	        v2g, g2v = {}, defaultdict(set)  
	        for u, g in enumerate(group):  
	            if g == -1:  
	                g = m  
	                m += 1  
	            v2g[u] = g  
	            g2v[g].add(u)  
	          
	        i_succ, i_pre = defaultdict(set), defaultdict(set)  
	        g_succ, g_pre = defaultdict(set), defaultdict(set)  
	        for v, nxt in enumerate(beforeItems):  
	            for u in nxt:  
	                if v2g[v] == v2g[u]:  
	                    i_succ[u].add(v)  
	                    i_pre[v].add(u)  
	                else:  
	                    g_succ[v2g[u]].add(v2g[v])  
	                    g_pre[v2g[v]].add(v2g[u])  
	          
	        group_order = topo_sort(set(v2g.values()), g_succ, g_pre)  
	        print(group_order)  
	        if not group_order: return []  
	          
	        ret = []  
	        for g in group_order:  
	            items_order = topo_sort(g2v[g], i_succ, i_pre)  
	            if len(items_order) != len(g2v[g]):  
	                return []  
	            ret += items_order  
	        return ret   
	```

### Floyd–Warshall

- 399. Evaluate Division

	```python  
	class Solution:  
	    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:  
	        graph = defaultdict(dict)  
	        for (u, v), w in zip(equations, values):  
	            graph[u][v] = w  
	            graph[v][u] = 1 / w  
	          
	        for k in graph:  
	            for i in graph:  
	                for j in graph:  
	                    if k in graph[i] and j in graph[k]:  
	                        graph[i][j] = graph[i][k] * graph[k][j]  
	          
	        return [(graph[u][v] if v in graph[u] else -1) for u, v in queries]  
	```

### Dijkstra_Bellman-Ford

[Graph-Dijkstra](https://yonglife.com/2019/06/01/Graph-Dijkstra/)
[Bellman-Ford](https://yonglife.com/2019/06/01/Graph-Bellman-Ford/)

- 1514. Path with Maximum Probability

	```python  
	class Solution:  
	    def maxProbability(self, n: int, edges: List[List[int]], succProb: List[float], start: int, end: int) -> float:  
	        '''  
	        # Bellman-Ford: Time O(V*E)  
	        dist = defaultdict(int)  
	        dist[start] = 1  
	        for i in range(n):  
	            cnt = 0  
	            for (u, v), w in zip(edges, succProb):  
	                if dist[v] < dist[u] * w:  
	                    dist[v] = dist[u] * w  
	                    cnt += 1  
	                if dist[u] < dist[v] * w:  
	                    dist[u] = dist[v] * w  
	                    cnt += 1  
	            if cnt == 0:  
	                break  
	        return dist[end]  
	        '''  
	        # Dijkstra  
	        graph = defaultdict(dict)  
	        for (u, v), w in zip(edges, succProb):  
	            graph[u][v] = w  
	            graph[v][u] = w  
	        dist = defaultdict(int)  
	        dist[start] = 1  
	        q = [(-1, start)]  
	        while q:  
	            _, u = heapq.heappop(q)  
	            if u == end: return dist[u]              
	            for v, w in graph[u].items():  
	                if dist[v] < dist[u] * w:  
	                    dist[v] = dist[u] * w  
	                    heapq.heappush(q, (-dist[v], v))  
	        return dist[end]  
	```

- 743. Network Delay Time

	```python  
	class Solution:  
	    def networkDelayTime(self, times: List[List[int]], N: int, K: int) -> int:  
	        graph = defaultdict(dict)  
	        for u, v, w in times:  
	            graph[u][v] = w  
	        '''[]  
	        # Dijkstra  
	        heap, dist = [(0, K)], defaultdict(lambda: math.inf)  
	        dist[K] = 0  
	        while heap:  
	            _, u = heapq.heappop(heap)  
	              
	            for v, w in graph[u].items():  
	                if dist[v] > dist[u] + w:  
	                    dist[v] = dist[u] + w  
	                    heapq.heappush(heap, (dist[v], v))  
	                  
	        return max(dist.values()) if all(dist[v] != math.inf for v in range(1, N+1)) else -1  
	        '''  
	        # Bellman ford  
	        dist = defaultdict(lambda: math.inf)  
	        dist[K] = 0  
	        for i in range(N):  
	            cnt = 0  
	            for u, v, w in times:  
	                if dist[v] > dist[u] + w:  
	                    dist[v] = dist[u] + w  
	                    cnt += 1  
	            if cnt == 0: break  
	        return max(dist.values()) if all(dist[v] != math.inf for v in range(1, N+1)) else -1  
	```

### Minimal-Spinning-Tree

https://yonglife.com/2017/04/24/Minimum-spanning-tree/

### Tarjan's algorithm

- 1192. Critical Connections in a Network

	## Find cut edge  
	
	```python  
	class Solution:  
	    def criticalConnections(self, n: int, edges: List[List[int]]) -> List[List[int]]:  
	        graph = [[] for i in range(n)]  
	        for u, v in edges:  
	            graph[u].append(v)  
	            graph[v].append(u)  
	          
	        ids, low = [-1] * n, [0] * n  
	        id_max, bridges = 0, []  
	          
	        def dfs(u, parent, bridges):  
	            nonlocal id_max  
	            id_max += 1  
	            ids[u] = low[u] = id_max  
	              
	            for v in graph[u]:  
	                if v == parent: continue  
	                if ids[v] == -1:  
	                    dfs(v, u, bridges)  
	                    low[u] = min(low[u], low[v])   
	                    if ids[u] < low[v]:  
	                        bridges.append([u, v])  
	                else:  
	                    low[u] = min(low[u], ids[v])  
	        dfs(u, -1, bridges)  
	        return bridges  
	```

## Union-find

> Implementation  

Tips:   
Create uf as list can be faster but dictionary can tell us whether an element is registered in the union-find which is useful in some case.  
```python  
uf = {}  
def find(x):  
    uf.setdefault(x, x)  
    if x != uf[x]:  
        uf[x] = find(uf[x])  
    return uf[x]  
def union(x, y):  
    uf[find(x)] = uf[find(y)]  
```  

> Usage  

>> Count the size of each subcomponent in a graph.   
1. Do a typical union find to bucket each vertex  
2. Traverse all vertex and increment the counter of subset it belong to (aka return value of find())  

>> Find cycle in a graph  
1. Do a typical union find  
2. A cycle is found when we encounter an edge (u, v) where find(u) == find(v)  

- 547. Friend Circles

```python  
class Solution:  
    def findCircleNum(self, M: List[List[int]]) -> int:  
        n = len(M)  
        arr = [i for i in range(n)]  
        def find(x):  
            if arr[x] != arr[arr[x]]: arr[x] = find(arr[x])  
            return arr[x]  
        for i, row in enumerate(M):  
            for j, c in enumerate(row):  
                if c == 1:  
                    arr[find(i)] = arr[find(j)]  
        return len(set(map(find, arr)))  
```

- 200. Number of Islands

```python  
class Solution:  
    def numIslands(self, grid: List[List[str]]) -> int:  
        def bfs(ori_r, ori_c):  
            q = deque([(ori_r, ori_c)])  
              
            while q:  
                r, c = q.popleft()  
                  
                for x, y in [(-1, 0), (1, 0), (0, 1), (0, -1)]:  
                    rr, cc = r+x, c+y  
                    if 0 <= rr < m and 0 <= cc < n and grid[rr][cc] == '1' and (rr, cc) not in visited:  
                        visited.add((rr, cc))  
                        q.append((rr, cc))  
              
        if not grid or not grid[0]:  
            return 0  
        m, n, ret, visited = len(grid), len(grid[0]), 0, set()  
          
        for i, row in enumerate(grid):  
            for j, val in enumerate(row):  
                if val == '1' and (i, j) not in visited:  
                    ret += 1  
                    visited.add((i, j))  
                    bfs(i, j)  
                      
        return ret  
          
        '''  
        uf = {}  
          
        def find(x):  
            uf.setdefault(x, x)  
            if uf[x] != x: uf[x] = find(uf[x])  
            return uf[x]  
          
        def union(x, y): # x-> y  
            uf[find(x)] = find(y)  
          
        for i, row in enumerate(grid):  
            for j, val in enumerate(row):  
                if val == '1':  
                    find((i, j))  
                    if i>0 and grid[i-1][j] == '1':  
                        union((i, j), (i-1, j))  
                    if j>0 and grid[i][j-1] == '1':  
                        union((i, j), (i, j-1))  
          
        return len(set(map(find, uf.keys())))  
        '''  
        '''  
        def dfs(r, c):  
            for x, y in [(-1, 0), (1, 0), (0, 1), (0, -1)]:  
                rr, cc = r+x, c+y  
                if 0 <= rr < m and 0 <= cc < n and grid[rr][cc] == '1' and (rr, cc) not in visited:  
                    visited.add((rr, cc))  
                    dfs(rr, cc)  
              
        if not grid or not grid[0]:  
            return 0  
        m, n, ret, visited = len(grid), len(grid[0]), 0, set()  
          
        for i, row in enumerate(grid):  
            for j, val in enumerate(row):  
                if val == '1' and (i, j) not in visited:  
                    ret += 1  
                    visited.add((i, j))  
                    dfs(i, j)  
                      
        return ret  
        '''  
```

- 323. Number of Connected Components in an Undirected Graph

```python  
class Solution:  
    def countComponents(self, n: int, edges: List[List[int]]) -> int:  
        uf = {}  
        def find(x):  
            uf.setdefault(x, x)  
            if uf[x] != x: uf[x] = find(uf[x])  
            return uf[x]  
        def union(x, y):  
            uf[find(x)] = uf[find(y)]  
          
        for u, v in edges:  
            union(u,v)  
        return len(set(map(find, range(n))))  
```

- 399. Evaluate Division

```python  
        uf = {}  
        def find(x):  
            uf.setdefault(x, (x, 1))  
            if uf[x][0] != x:  
                p, r = find(uf[x][0])  
                uf[x] = (p, r*uf[x][1])  
            return uf[x]  
          
        def union(x, y, ratio): # x -> y  
            px, rx, py, ry = *find(x), *find(y)  
            if ratio is None:  
                return rx / ry if px == py else -1  
            uf[px] = (py, ratio * (ry / rx))  
              
        graph = defaultdict(dict)  
        for (u, v), w in zip(equations, values):  
            union(u, v, w)  
          
        return [union(u, v, None) if u in uf and v in uf else -1 for u, v in queries]  
```

- 261. Graph Valid Tree

```python  
class Solution:  
    def validTree(self, n: int, edges: List[List[int]]) -> bool:  
        # What is a tree  
        # 1. No cycle  
        # 2. All vertex are connected  
        uf = {}  
        def find(x):  
            uf.setdefault(x, x)  
            if uf[x] != x: uf[x] = find(uf[x])  
            return uf[x]  
        def union(x, y):  
            uf[find(x)] = uf[find(y)]  
          
        for u, v in edges:  
            if find(u) == find(v):  
                return False  
            union(u, v)  
        return True and len(set(map(find, range(n)))) == 1  
```

- 959. Regions Cut By Slashes

```python  
class Solution:  
    def regionsBySlashes(self, M: List[str]) -> int:  
        def find(x):  
            if arr[x] != arr[arr[x]]: arr[x] = find(arr[x])  
            return arr[x]  
        def get_idx(x, y, z):  
            return x * 2 * n + y * 2 + z  
        n = len(M)  
        arr = [i for i in range(n*n*2)]  

        for i in range(n):  
            for j in range(n):  
                if M[i][j] == '/':  
                    if i > 0:  
                        arr[get_idx(i, j, 0)] = find(get_idx(i-1, j, 0 if M[i-1][j] == '\\' else 1))  
                    if j > 0:  
                        arr[find(get_idx(i, j, 0))] = find(get_idx(i, j-1, 1))  
                elif M[i][j] == '\\':  
                    if j > 0:  
                        arr[find(get_idx(i, j, 0))] = find(get_idx(i, j-1, 1))  
                    if i > 0:  
                        arr[get_idx(i, j, 1)] = find(get_idx(i-1, j, 0 if M[i-1][j] == '\\' else 1))  
                else:  
                    arr[get_idx(i, j, 1)] = arr[get_idx(i, j, 0)]  
                    if i > 0:  
                        arr[get_idx(i, j, 0)] = find(get_idx(i-1, j, 0 if M[i-1][j] == '\\' else 1))  
                    if j > 0:  
                        arr[find(get_idx(i, j, 0))] = find(get_idx(i, j-1, 1))  


        return len(set(map(find, arr)))  
```

- 947. Most Stones Removed with Same Row or Column

```python  
class Solution:  
    def removeStones(self, stones: List[List[int]]) -> int:  
        uf = {}  
        def find(x):  
            if x != uf[x]:  
                uf[x] = find(uf[x])  
            return uf[x]  
        def union(a, b):  
            uf.setdefault(a, a)  
            uf.setdefault(b, b)  
            uf[find(a)] = uf[find(b)]  
          
        for x, y in stones:  
            union(x, ~y)  
        return len(stones) - len(set(map(find , uf)))  
```

- 128. Longest Consecutive Sequence

```python  
class Solution:  
    def longestConsecutive(self, nums: List[int]) -> int:  
        d = {num: num for num in nums}  
        def find(x):  
            if d[x] - 1 in d: d[x] = find(d[x] - 1)  
            return d[x]  
        ret = 0  
        for num in nums:  
            ret = max(ret, num - find(num) + 1)  
        return   
```

- 928. Minimize Malware Spread II

```python  
class Solution:  
    def minMalwareSpread(self, graph: List[List[int]], initial: List[int]) -> int:  
        def find(x):  
            nonlocal uf  
            uf.setdefault(x, x)  
            if uf[x] != x: uf[x] = find(uf[x])  
            return uf[x]  
        def union(x, y):  
            uf[find(x)] = uf[find(y)]  
              
        initial.sort(reverse=True)  
        ret, safe = None, 0  
        for removed in initial:  
            uf = {}  
            for u, row in enumerate(graph):  
                for v, state in enumerate(row):  
                    if removed not in [u, v] and state == 1:  
                        union(u, v)  
              
            subset_safe = {s: True for s in set(uf.values())}  
            subset_cnt = Counter()  
            for u in range(len(graph)):  
                if u != removed:  
                    subset_cnt[find(u)] += 1  
            for u in initial:  
                if u != removed:  
                    subset_safe[find(u)] = False  
              
            safe_cnt = sum(val for key, val in subset_cnt.items() if subset_safe[key])  

            if safe_cnt >= safe:  
                safe, ret = safe_cnt, removed  
        return ret  
                  
```

- 765. Couples Holding Hands

https://leetcode.com/problems/couples-holding-hands/discuss/336706/The-general-mathematical-idea%3A-permutation-graph-and-graph-decomposition.

- 1168. Optimize Water Distribution in a Village

[https://leetcode.com/problems/optimize-water-distribution-in-a-village/discuss/365853/C%2B%2BPythonJava-Hidden-Well-in-House-0](https://leetcode.com/problems/optimize-water-distribution-in-a-village/discuss/365853/C%2B%2BPythonJava-Hidden-Well-in-House-0)


```  
class Solution:  
    def minCostToSupplyWater(self, n: int, wells: List[int], pipes: List[List[int]]) -> int:  
        '''  
        wells = [(c, 0, i) for i, c in enumerate(wells, 1)]  
        pipes = [(c, u, v) for u, v, c in pipes]  
          
        ret, cnt = 0, 0  
        # Kruskal   
        uf = {}  
        def find(x):  
            uf.setdefault(x, x)  
            if uf[x] != x: uf[x] = find(uf[x])  
            return uf[x]  
        for c, u, v in sorted(wells+pipes):  
            pu, pv = find(u), find(v)  
            if pu != pv:  
                uf[pu] = uf[pv]  
                ret += c  
                cnt += 1  
            if cnt == n:  
                return ret   
        '''  
        # Prim  
        graph = defaultdict(dict)  
        for u, v, c in pipes + [(0, i, c) for i, c in enumerate(wells, 1)]:  
            graph[u][v] = min(c, graph[u].get(v, c))  
            graph[v][u] = min(c, graph[v].get(u, c))  

        visited, ret = set(), 0  
        pq = [(0, -1, 0)]  
        while pq:  
            c, _, u = heapq.heappop(pq)  
            if u in visited: continue  
            ret += c  
            visited.add(u)  
            if len(visited) == n+1: return ret  
            for v, c in graph[u].items():  
                if v in visited: continue  
                heapq.heappush(pq, (c, u, v))  
              
                  
```

## Dynamic programming 

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

### One dimension 

- 91. Decode Ways

	```python  
	class Solution:  
	    def numDecodings(self, s: str) -> int:  
	        '''  
	        # Top down: Time O(N) Space O(N)  
	        dp = {0: 1}  
	        def helper(x):  
	            if x in dp: return dp[x]  
	            dp[x] = (helper(x-1) if s[x-1] != '0' else 0) + (helper(x-2) if x > 1 and 9 < int(s[x-2:x]) <= 26 else 0)  
	            return dp[x]  
	        return helper(len(s))  
	        '''  
	        # Bottom up: Time O(N) Space O(1)  
	        p2, p1 = 1, 1 if s[0] != '0' else 0  
	        for i in range(1, len(s)):  
	            cur = p1 if s[i] != '0' else 0  
	            cur += p2 if 9 < int(s[i-1:i+1]) <= 26 else 0  
	            if cur == 0: return 0  
	            p2, p1 = p1, cur  
	        return p1  
	```

- 96. Unique Binary Search Trees

	https://leetcode.com/problems/unique-binary-search-trees/discuss/665520/Python-Concise-Botton-up-%2B-Top-down

- 70. Climbing Stairs

	```python  
	class Solution:  
	    def climbStairs(self, n: int) -> int:  
	        '''          
	        d = {0:1, 1:1}  
	        def helper(k):  
	            if k in d: return d[k]  
	            d[k] = helper(k-1) + helper(k-2)  
	            return d[k]  
	        return helper(n)  
	        '''  
	        a, b = 1, 1  
	        if n == 1: return 1  
	        while n > 1:  
	            a, b = b, a+b  
	            n-=1  
	        return b  
	```

- 152. Maximum Product Subarray

	https://leetcode.com/problems/maximum-product-subarray/discuss/665622/Python-Concise-DP-Bottom-up-%2B-Top-down

- 120. Triangle

	https://leetcode.com/problems/triangle/discuss/667442/Python-Concise-DP-Bottom-up-%2B-Top-down

- 198. House Robber

	```python  
	class Solution:  
	    def rob(self, nums: List[int]) -> int:  
	        if not nums: return 0  
	        '''  
	        # bottom up  
	        a, b = 0, nums[0]  
	        for v in nums[1:]:  
	            a, b = b, max(b, a+v)  
	        return b  
	        '''  
	        # Top down  
	        d = {-1: 0, 0: nums[0]}  
	        def helper(k):  
	            if k in d: return d[k]  
	            d[k] = max(helper(k-2)+nums[k], helper(k-1))  
	            return d[k]  
	        return helper(len(nums)-1)  
	```

- 139. Word Break

	https://leetcode.com/problems/word-break/discuss/665575/Python-Concise-DP-Bottom-up-%2B-Top-down

- 120. Triangle

- 413. Arithmetic Slices

	https://leetcode.com/problems/arithmetic-slices/discuss/671064/Python-Concise-DP-Bottom-up-%2B-Top-down

- 64. Minimum Path Sum

	https://leetcode.com/problems/minimum-path-sum/discuss/667483/Python-Concise-Bottom-up-%2B-Top-down

- 894. All Possible Full Binary Trees

	[https://leetcode.com/problems/all-possible-full-binary-trees/discuss/725016/Python-Concise-DP-Top-down-%2B-Bottom-up](https://leetcode.com/problems/all-possible-full-binary-trees/discuss/725016/Python-Concise-DP-Top-down-%2B-Bottom-up)

- 472. Concatenated Words

	```python  
	class Solution:  
	    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:  
	        # Top down DP: Time  O(N * M^2) where M is the average length of the words  
	        #              Space O(N * M)  
	        d = set(words)  
	        import functools  
	        @functools.lru_cache(None)  
	        def dp(word):  
	            if not word: return False  
	            return any((word[i:] in d) and (word[:i] in d or dp(word[:i])) for i in range(1, len(word)))  
	        return [word for word in words if dp(word)]  
	```

- 343. Integer Break

	https://leetcode.com/problems/integer-break/discuss/676483/Python-DP-without-math-trick

- 338. Counting Bits

	```python  
	class Solution:  
	    def countBits(self, num: int) -> List[int]:  
	        dp = [0] * (num+1)  
	        if num == 0: return dp  
	        dp[1], prev = 1, 1  
	        for i in range(2, num+1):  
	            if i == prev * 2:  
	                dp[i] = 1  
	                prev = i  
	            else:  
	                dp[i] = 1 + dp[i-prev]  
	        return dp  
	```

- 309. Best Time to Buy and Sell Stock with Cooldown

	https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/discuss/669064/Python-Concise-DP-Botton-up-%2B-Top-down

- 279. Perfect Squares

- 32. Longest Valid Parentheses

	https://leetcode.com/problems/longest-valid-parentheses/discuss/669186/Python-Concise-DP-Bottom-up-%2B-Top-down

- 140. Word Break II

	https://leetcode.com/problems/word-break-ii/discuss/672708/Python-Concise-DP-Bottom-up-%2B-Top-down

- 264. Ugly Number II

- 357. Count Numbers with Unique Digits

### Two dimension

- 5. Longest Palindromic Substring

	[https://leetcode.com/problems/longest-palindromic-substring/discuss/663984/python-concise-dp-on2](https://leetcode.com/problems/longest-palindromic-substring/discuss/663984/python-concise-dp-on2)

- 72. Edit Distance

	[https://leetcode.com/problems/edit-distance/discuss/663855/Python-Concise-memorization-%2B-Botton-up](https://leetcode.com/problems/edit-distance/discuss/663855/Python-Concise-memorization-%2B-Botton-up)

- 95. Unique Binary Search Trees II

	[https://leetcode.com/problems/unique-binary-search-trees-ii/discuss/669241/Python-Concise-DP-Bottom-up-%2B-Top-down](https://leetcode.com/problems/unique-binary-search-trees-ii/discuss/669241/Python-Concise-DP-Bottom-up-%2B-Top-down)

- 115. Distinct Subsequences

	https://leetcode.com/problems/distinct-subsequences/discuss/673798/Python-Concise-DP-Bottom-up-%2B-Top-down

- 188. Best Time to Buy and Sell Stock IV

	https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/discuss/676357/Python-Concise-DP-Bottom-up-%2B-Top-down

- 562. Longest Line of Consecutive One in Matrix

	```python  
	class Solution:  
	    def longestLine(self, M: List[List[int]]) -> int:  
	        if not M: return 0  
	        m, n = len(M) , len(M[0])  
	          
	        '''  
	        @lru_cache(None)  
	        def dp(r, c):  
	            if not (0 <= r < m and 0 <= c < n) or M[r][c] != 1:  
	                return (0, 0, 0, 0)  
	            # left, left-top, top  
	            left, lt, top, rt = dp(r, c-1)[0]+1, dp(r-1, c-1)[1]+1, dp(r-1, c)[2]+1, dp(r-1, c+1)[3]+1  
	            return (left, lt, top, rt)  
	          
	        return max(max(dp(r, c)) for r in range(m) for c in range(n))  
	        '''  
	        dp, ret = Counter(), 0  
	          
	        for i, row in enumerate(M):  
	            for j, val in enumerate(row):  
	                dp[(i, 0)] = dp[(i, 0)] + 1 if val else 0  
	                dp[(j, 1)] = dp[(j, 1)] + 1 if val else 0  
	                dp[(i+j, 2)] = dp[(i+j, 2)] + 1 if val else 0  
	                dp[(j-i, 3)] = dp[(j-i, 3)] + 1 if val else 0  
	                  
	                ret = max((ret, dp[(i, 0)], dp[(j, 1)], dp[(i+j, 2)], dp[(j-i, 3)]))  
	
	        return ret        
	```

- 10. Regular Expression Matching

	[https://leetcode.com/problems/regular-expression-matching/discuss/665501/Python-Concise-DP-Botton-up-%2B-Top-down](https://leetcode.com/problems/regular-expression-matching/discuss/665501/Python-Concise-DP-Botton-up-%2B-Top-down)

- 44. Wildcard Matching

	https://leetcode.com/problems/wildcard-matching/discuss/687707/Python-Concise-DP-Bottom-up-%2B-Top-down

- 375. Guess Number Higher or Lower II

	```python  
	class Solution:  
	    def getMoneyAmount(self, n: int) -> int:  
	        @lru_cache(None)  
	        def dp(l, r):  
	            if r-l <= 1:  
	                return 0  
	              
	            ret = math.inf  
	            for i in range(l, r):  
	                ret = min(ret, i + max(dp(l, i), dp(i+1, r)))  
	            return ret  
	          
	        return dp(1, n+1)  
	```

- 312. Burst Balloons

	https://leetcode.com/problems/burst-balloons/discuss/665527/Python-Concise-Botton-up-%2B-Top-down

- 221. Maximal Square

	```python  
	class Solution:  
	    def maximalSquare(self, M: List[List[str]]) -> int:  
	        if not M or not M[0]: return 0  
	        m, n = len(M), len(M[0])  
	        h, max_l = [0] * n, 0  
	        '''  
	        # bottom up: Time O(M*N) Space O(M*N)  
	        dp = [[0]*(n+1) for _ in range(m+1)]  
	          
	        for i in range(m):  
	            w = 0  
	            for j in range(n):  
	                if M[i][j] == '0':  
	                    w, h[j], dp[i+1][j+1] = 0, 0, 0  
	                else:  
	                    w, h[j] = w+1, h[j]+1  
	                    dp[i+1][j+1] = min(w, h[j], dp[i][j]+1)  
	                    max_l = max(max_l, dp[i+1][j+1])  
	        return max_l * max_l  
	        '''  
	        # bottom up: Time O(M*N) Space O(N)  
	        dp, ndp = [0] * (n+1), [0] * (n+1)  
	        for i in range(m):  
	            w = 0  
	            for j in range(n):  
	                if M[i][j] == '0':  
	                    w, h[j], ndp[j+1] = 0, 0, 0  
	                else:  
	                    w, h[j] = w+1, h[j]+1  
	                    ndp[j+1] = min(w, h[j], dp[j]+1)  
	                    max_l = max(max_l, ndp[j+1])  
	            dp, ndp = ndp, [0] * (n+1)  
	        return max_l * max_l  
	```

- 97. Interleaving String

	https://leetcode.com/problems/interleaving-string/discuss/673764/Python-Concise-DP-Bottom-up-%2B-Top-down

- 1140. Stone Game II

	contest/competitive games  
	
	https://leetcode.com/problems/stone-game-ii/discuss/345230/Python-DP-Solution

- 410. Split Array Largest Sum

	https://leetcode.com/problems/split-array-largest-sum/discuss/676272/Python-Concise-DP-Bottom-up-%2B-Top-down

- 87. Scramble String

	```python  
	class Solution:  
	    def isScramble(self, s1: str, s2: str) -> bool:  
	        # Top down: Time O(N^3) Space O(N^3)  
	        import functools  
	        @functools.lru_cache(None)  
	        def dp(s1, s2, rev):  
	            if s1 == s2 or s1 == s2[::-1]: return True  
	            return any(dp(s1[:i], s2[:i], True) and dp(s1[i:], s2[i:], True) for i in range(1, len(s1))) or \  
	                   (rev and dp(s1, s2[::-1], not rev))  
	        return dp(s1, s2, True)        
	```

- 730. Count Different Palindromic Subsequences

	```python  
	class Solution:  
	    def countPalindromicSubsequences(self, S):  
	        import functools  
	        @functools.lru_cache(None)  
	        def dp(start, end):     #returns the number of distinct palindromes in S[start:end]  
	            count = 0  
	            segment = S[start:end]  
	            for x in 'abcd':  
	                try:  
	                    i = segment.index(x) + start  # the starting index in S  
	                    j = segment.rindex(x) + start # the ending index in S  
	                except:  
	                    continue  
	                count += dp(i+1, j) + 2 if i != j else 1  
	            return count % 1000000007  
	        return dp(0, len(S))  
	```

- 727. Minimum Window Subsequence

	```python  
	class Solution:  
	    def minWindow(self, S: str, T: str) -> str:  
	        @lru_cache(None)  
	        def dp(x, y):  
	            if y == len(T): return x  
	            if x >= len(S): return math.inf  
	              
	            if S[x] != T[y]:  
	                return dp(x+1, y)  
	            else:                  
	                return dp(x+1, y+1)  
	        ret = None  
	        for i in range(len(S)):  
	            k = dp(i, 0)  
	            if k != math.inf and (not ret or len(ret) > (k-i)):  
	                ret = S[i:k]  
	        return ret if ret else ''  
	```

- 1130. Minimum Cost Tree From Leaf Values

	https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/discuss/667294/Python-Concise-DP-Bottom-up-%2B-Top-down

- 1548. The Most Similar Path in a Graph

	```python  
	class Solution:  
	    def mostSimilar(self, n: int, roads: List[List[int]], names: List[str], targetPath: List[str]) -> List[int]:  
	        graph, succ = defaultdict(set), {}  
	        for u, v in roads:  
	            graph[u].add(v)  
	            graph[v].add(u)  
	          
	        for i in range(n):  
	            graph[-1].add(i)  
	          
	        @lru_cache(None)  
	        def dp(idx, city_idx):  
	            if idx >= len(targetPath):  
	                return 0  
	              
	            edit = math.inf  
	            for nxt in graph[city_idx]:  
	                n_edit = dp(idx+1, nxt) + (not (targetPath[idx] == names[nxt]))  
	                if n_edit < edit:  
	                    edit = n_edit  
	                    succ[(idx, city_idx)] = nxt  
	            return edit  
	          
	        dp(0, -1)  
	
	        ret = [-1]  
	        while len(ret) <= len(targetPath):  
	            ret.append(succ[(len(ret)-1, ret[-1])])  
	              
	        return ret[1:]  
	```

### Three dimension

- 1473. Paint House III

	[https://leetcode.com/problems/paint-house-iii/discuss/674485/Python-Solution](https://leetcode.com/problems/paint-house-iii/discuss/674485/Python-Solution)
	
	```python  
	
	class Solution:  
	    def minCost(self, houses: List[int], cost: List[List[int]], m: int, n: int, target: int) -> int:  
	        '''  
	        # Top down: Time O(m*n*t*n) Space O(m*n*t)  
	        dp = {}# idx, t, color  
	        def helper(x, t, c):  
	            if (x, t ,c) in dp: return dp[x, t, c]  
	            if x < t or t < 1 or x < 0: return float('inf')  
	            my_cost = cost[x][c] if houses[x] == 0 else (0 if houses[x] == c+1 else float('inf'))  
	            if x == 0 and t == 1: return my_cost  
	            dp[x, t, c] = helper(x-1, t, c) + my_cost  
	            for i in range(n):  
	                if i == c: continue  
	                dp[x, t, c] = min(dp[x, t, c], helper(x-1, t-1, i)+my_cost)  
	            return dp[x, t, c]  
	        rst = min(helper(m-1, target, c) for c in range(n))  
	        return rst if rst != float('inf') else -1  
	        '''  
	        # Bottom up: Time O(m*n*t*n) Space O(n*t)  
	        dp, ndp = {(0,0): 0}, {} # (color, group)  
	        for i, c in enumerate(houses):  
	            for cc in (range(1, n+1) if c == 0 else [c]):  
	                for c_prev, g_prev in dp:  
	                    g_new = g_prev + (cc != c_prev)  
	                    if g_new > target: continue  
	                    ndp[cc, g_new] = min(ndp.get((cc, g_new), float('inf')), dp[c_prev, g_prev] + (cost[i][cc-1] if c == 0 else 0))  
	            dp, ndp = ndp, {}  
	          
	        return min([dp[c, g] for c, g in dp if g == target] or [-1])  
	```

- 1463. Cherry Pickup II

	```python  
	class Solution:  
	    def cherryPickup(self, grid: List[List[int]]) -> int:  
	        m, n = len(grid), len(grid[0])  
	          
	        @lru_cache(None)  
	        def dp(row, r1, r2):  
	            if row == m: return 0  
	              
	            ret = collected = grid[row][r1] + (grid[row][r2] if r2 != r1 else 0)  
	            for i in range(-1, 2):  
	                if not 0 <= r1 + i < n: continue  
	                for j in range(-1, 2):  
	                    if not 0 <= r2 + j < n: continue  
	                    ret = max(ret, collected + dp(row+1, r1+i, r2+j))  
	              
	            return ret  
	          
	        return dp(0, 0, n-1)  
	```

### Bitmask

- 1434. Number of Ways to Wear Different Hats to Each Other

	```python  
	class Solution:  
	    def numberWays(self, hats: List[List[int]]) -> int:  
	        h2p = defaultdict(list)  
	        for i, hat in enumerate(hats):  
	            for h in hat:  
	                h2p[h].append(i)  
	        n = len(hats)  
	
	        @lru_cache(None)  
	        def dp(hat, mask):  
	            if mask == 0: return 1  
	            if hat < 1: return 0  
	              
	            ret = dp(hat-1, mask)  
	            for p in h2p[hat]:  
	                if mask & (1 << p):  
	                    mask ^= (1 << p)  
	                    ret += dp(hat-1, mask)  
	                    mask |= (1 << p)  
	            return ret % (10**9 + 7)  
	          
	        return dp(40, (1<<n)-1)  
	```
