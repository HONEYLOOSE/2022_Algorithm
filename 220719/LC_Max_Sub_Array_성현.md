# 문제 정보
리트코드 - Medium - 못 풀어서 해설 봤음

[53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

[리트코드 해설](https://leetcode.com/problems/maximum-subarray/discuss/139218/Javascript-very-clear-and-short-DP-solution)

[블로그 해설](https://dndi117.tistory.com/entry/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EB%A6%AC%ED%8A%B8%EC%BD%94%EB%93%9C-53-Maximum-Subarray-%ED%92%80%EC%9D%B4)


# 접근 방법 (해설)
DP 쓰면 된다.

```javascript
var maxSubArray = function(nums) {
    for (let i = 1; i < nums.length; i++){
        nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
    }
    return Math.max(...nums);
};
```
```python
class Solution:    
    def maxSubArray(self, nums: List[int]) -> int:
        mx = float('-inf')
        cur_mx = float('-inf')
        for num in nums:
            cur_mx = max(num, cur_mx + num)
            mx = max(mx, cur_mx)
        return mx
```
|index|1|2|3|4|5|6|7|8|9|
|-|-|-|-|-|-|-|-|-|-|
|num|-2|1|-3|4|-1|2|1|-5|4|
|cur_max|-2|1|-2|4|3|5|6|1|5

1번부터 1번 인덱스를 가지고 만들 수 있는 최대값은 `-2`.

1번부터 2번 인덱스를 가지고 만들 수 있는 최대값은 `1`.

- (1번부터 1번 인덱스로 만들 수 있는 최대값이 `-2`인데, 2번 인덱스가 ~개입 안하면 `-2`~, 개입하면 `-1`, 자체 값만 쓰면 `1`)

1번부터 3번 인덱스를 가지고 만들 수 있는 최대값은 `-2`.

- (1번부터 2번 인덱스로 만들 수 있는 최대값이 `1`인데, ~3번 인덱스가 개입 안하면 `1`,~ 개입하면 `-2`, 자체 값만 쓰면 `-3`)

이런식으로 쭉 반영해 나가면 됨.

> 근데 왜 값에선 `Math.max(nums[i], nums[i] + nums[i - 1]);`만 쓰지?

개입 안한다가 불가능하기 때문, 개입 안한다 = 건너뛰겠다는 이야기 = Sub Array가 아님.

# 배워갈 점
**DP**

[DP 상세설명](https://www.zerocho.com/category/Algorithm/post/584b979a580277001862f182)

[LCS 상세 그림 설명](https://velog.io/@emplam27/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-LCS-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Longest-Common-Substring%EC%99%80-Longest-Common-Subsequence)
