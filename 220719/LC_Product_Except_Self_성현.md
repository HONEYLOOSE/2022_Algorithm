# 문제 정보
리트코드 - MEDIUM - 못 풀어서 [해설](https://leetcode.com/problems/product-of-array-except-self/discuss/65663/Javascript-solution-if-anyone-is-interested) 봄

[238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

# 접근법 - 해설
```javascript
var productExceptSelf = function(nums) {
    var output = [];
    var leftMult = 1;
    var rightMult = 1;
    for (var i=nums.length - 1; i >= 0; i--) {
        output[i] = rightMult;
        rightMult *= nums[i];
    }
    for (var j=0; j < nums.length; j++) {
        output[j] *= leftMult;
        leftMult *= nums[j];
    }
    return output;
};
```
자신을 뺀 과거의 값들의 곱을 좌우 양방향으로 하면, 결국 자신을 뺀 앞으로의 값들과 과거의 값들의 곱만 남게 된다.

# 배운 점
문제를 쪼개서 생각하는 방법을 길러야겠다

나를 제외한 나머지 값들의 곱 = 나보다 앞선 값들의 곱 * 나보다 늦은 값들의 곱
