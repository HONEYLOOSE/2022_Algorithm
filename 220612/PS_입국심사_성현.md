### 문제 정보
프로그래머스 Lv.3
[입국심사](https://programmers.co.kr/learn/courses/30/lessons/43238)

### 푼 방법
이분탐색, LowerBound

### 새로 알게 된 것
* 이분탐색 개념잡기 (출처 : 프로그래머스 질문)
> 접근 방법 자체를 다시 생각해보세요
>
> 이분 탐색으로 답을 찾는 작업은 작업 시간들을 비교해서 최적의 스케쥴을 찾는것이 아닙니다.
>
> 작업과정을 간략하게 말하자면 아래와 같으니 참고해보세요
> 처음에 middle 값을 대충 정함
> middle 시간안에 처리할 수 있는 총 사람수를 구함(done_num=sum(mid//time for time in times))
> [해당시간에 처리할수 있는 사람수]와 [목표 사람수]를 비교함
> * [처리할수 있는 사람수]가 [처리해야되는 사람수]보다 많으면 시간을 너무 여유있게 잡았음 -> 시간을 줄여봄
> * [처리할수 있는 사람수]가 [처리해야되는 사람수]보다 적으면 시간을 너무 빡빡하게 잡았음 -> 시간을 늘려봄
> [처리할수 있는 사람수]와 [처리해야되는 사람수]가 같으면
> * 스케쥴은 모르겠지만 아무튼 시간은 구했다! 끝!

* LowerBound / UpperBound 개념
> 아직 이분탐색 개념이 확실하지 않은 듯, up - down해서 정확히 한 값이 나오는 게 아니라, **범위**로 나올 수 있음! 그래서 min을 반환하거나, max를 반환하거나..
> LowerBound, UpperBound


### 코드
```javascript
const check = (total, n, times) => {
  const count = times.reduce((acc, v) => acc + total / v, 0n);

  if (count < n) {
    return false;
  } else {
    return true;
  }
};

function solution(n, times) {
  let min = BigInt(1);
  // let min = 1;

  let max = BigInt(Math.max(...times) * n);
  let mid = BigInt(0);

  while (max > min) {
    mid = (min + max) / BigInt(2);
    if (
      check(
        mid,
        BigInt(n),
        times.map((e) => BigInt(e))
      )
    ) {
      max = mid;
    } else {
      min = mid + 1n;
    }
  }

  // console.log(min);
  return min; // 왜 mid 반환 안하고 min 반환하는지? : lowerBound기 때문
}
```


