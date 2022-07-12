# 문제정보
### 미해결

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/70130)

# 접근법
- 문제에서 요구하는 것은 (A, B), (B, C), (B, D) 식으로 2개씩 묶었을 경우 공통의 B를 포함하며, 한 튜플은 서로 같은 값을 가지면 안 되는 (B,B) 부분수열의 최대 길이이다.
- 결국 최대 길이는 주어진 수열에서 가장 많이 반복되는 숫자가 조건을 만족하는 한 값을 가지는 경우이다.
- 예시로 주어진 수열 [5, 2, 3, 3, 5 ,3] 에서는 가장 많이 등장하는 3이 [(5 | 2, 3), (3, 5) | (5, 3)]이고, 이 경우 4가 된다.
- 3번 등장하는 3 다음으로 많이 등장하는 수인 5는 최대 2개이므로 2 * 2 = 4가 최대값이 되므로, 4가 최대값이 된다.


# 시간복잡도
- 최빈값 구할 때 : N + NlogN
- 최빈값에 따른 스타수열 쌍 만들 때 : N
- 이후 추가 필요


# 막힌 포인트
- 최빈값에 따른 가능한 스타수열 값 쌍을 만든 이후, 구현에서 막혔음.
```javascript
const a = [5, 2, 3, 3, 5, 3];

// result
[
  { v: 5, checks: [ 1 ] },
  { v: 2, checks: [ 1 ] },
  { v: 5, checks: [ 2, 3 ] }
]

```
- (5, 2)는 1번 "3"과 쌍이 될 수 있고, 5는 2번 "3" 또는 3번 "3"과 쌍이 될 수 있다.
- 따라서 2개의 쌍을 만들 수 있으므로 `2 * 2 = 4`가 된다.

```javascript
const a = [0, 3, 3, 0, 7, 2, 0, 2, 2, 0];

// result
[
  { v: 3, checks: [ 1, 2 ] },
  { v: 3, checks: [ 1, 2 ] },
  { v: 7, checks: [ 2ㅎ, 3 ] },
  { v: 2, checks: [ 2, 3 ] },
  { v: 2, checks: [ 3, 4 ] },
  { v: 2, checks: [ 3, 4 ] }
]
```
- 같은 방법으로 선택해서 지워나가게 되면 4쌍을 만들 수 있으므로 `4 * 2 = 6`이 된다.

# 코드
```javascript
export const solution = () => {
  // const a = [5, 2, 3, 3, 5, 3];
  const a = [0, 3, 3, 0, 7, 2, 0, 2, 2, 0];

  const frequency = new Map([]);
  a.forEach((e) => {
    if (frequency.has(e)) {
      frequency.set(e, frequency.get(e) + 1);
    } else {
      frequency.set(e, 1);
    }
  });
  const sortedFre = Array.from(frequency)
    .sort((a, b) => b[1] - a[1])
    .map((e) => {
      const [key, number] = e;
      return { key, number };
    });
  console.log(sortedFre);
  
  // endof 최빈값 구하기

  const most = sortedFre[0].key;
  const mostNum = sortedFre[0].number;

  let current = 0;
  const check = a.reduce((acc, v, idx) => {
    if (v === most) {
      current++;
    } else {
      let checks = [];
      if (current === 0) {
        checks = [1];
      } else if (current === mostNum) {
        checks = [mostNum];
      } else {
        checks = [current, current + 1];
      }
      const result = {
        v,
        checks,
      };
      acc.push(result);
    }
    return acc;
  }, []);
  console.log(check);
  
  // endof 후보쌍 구하기
  
  // ...
};

```
