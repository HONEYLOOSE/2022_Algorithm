### 문제 정보
[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/43238)

### 푼 방법
이분탐색

### 새로 알게 된 것
프로그래머스 질문에서 발췌
```
접근 방법 자체를 다시 생각해보세요
이분 탐색으로 답을 찾는 작업은 작업 시간들을 비교해서 최적의 스케쥴을 찾는것이 아닙니다.

작업과정을 간략하게 말하자면 아래와 같으니 참고해보세요

처음에 middle 값을 대충 정함
middle 시간안에 처리할 수 있는 총 사람수를 구함(done_num=sum(mid//time for time in times))
[해당시간에 처리할수 있는 사람수]와 [목표 사람수]를 비교함

* [처리할수 있는 사람수]가 [처리해야되는 사람수]보다 많으면 시간을 너무 여유있게 잡았음 -> 시간을 줄여봄

* [처리할수 있는 사람수]가 [처리해야되는 사람수]보다 적으면 시간을 너무 빡빡하게 잡았음 -> 시간을 늘려봄
[처리할수 있는 사람수]와 [처리해야되는 사람수]가 같으면

* 스케쥴은 모르겠지만 아무튼 시간은 구했다! 끝!
```

### 코드
```javascript
export const solution = () => {
  const n = 6;
  const times = [7, 10];

  let min = Math.floor(n / times.reduce((acc, time) => acc + 1 / time, 0));
  let max = Math.max(...times) * Math.ceil(n / times.length);
  while (max > min) {
    const mid = Math.floor((min + max) / 2);
    const handlePeople = times.reduce((acc, v) => acc + Math.floor(min / v), 0);
    //   let left = n;
    //   for (const time of times) {
    //     left = left - Math.floor(mid / time);
    //     if (left <= 0) break;
    //   }
    //   if (left <= 0) {
    //     max = mid;
    //   } else {
    //     min = mid + 1;
    //   }
    if (handlePeople > n) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }

  console.log(min);
  return min;
};

```
