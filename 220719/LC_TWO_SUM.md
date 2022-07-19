# 문제 정보
[1. Two Sum](https://leetcode.com/problems/two-sum/)

# 접근법
그냥 풀이 O(N^2) - 그냥 단순하게 쭉 2차원 배열 순회
```javascript
var twoSum = function(nums, target) {
    // O(n^2)
    for(let i =0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            if((nums[i] + nums[j]) === target) {
                return [i, j]
            }
        }
    }
};
```
Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
```javascript
var twoSum = function(nums, target) {
    let map = new Map();
    
    for(let i = 0; i < nums.length; i ++) {
        if(map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        } else {
            map.set(nums[i], i);
        }
    }
	return [];
};
```
[[Neat] JavaScript Map, O(n)](https://leetcode.com/problems/two-sum/discuss/234005/Neat-JavaScript-Map-O(n))

# 배운 점
Array 탐색은 O(N)인데, Map을 써서 접근하면 읽기는 O(1)이므로 연산량을 줄일 수 있음.
