### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/1843)

### 접근법
메모이제이션?
오른쪽부터 최소-최대 계산결과를 저장해둔다.
왼쪽으로 가면서 마이너스(-)가 나오기 전까지 의 숫자들을 다 더해서 한 덩어리를 만든다.
마이너스가 나오면 최소, 최대 저장값과 현재까지 더해둔 값을 조합해서 새로운 최소-최대 결과를 저장한다.

### 시간복잡도
O(N)

### 공간복잡도
O(1)

### 풀면서 놓쳤던점


### 이 문제를 통해 얻어갈 것
동적계획법

### 코드
```python
def solution(arr):
    MIN = 0
    MAX = 0
    SUM = 0
    
    for i in range(len(arr)-1,-1,-1):
        e = arr[i]
        
        if e == '-':
            MIN_t = MIN
            MAX_t = MAX
            
            MAX = max( (-2) * (int(arr[i+1])) + SUM + MAX_t , -1*(SUM + MIN_t))
            MIN = min(-1*SUM + MIN_t , -1*(SUM + MAX_t))
            SUM = 0
        elif e == '+':
            pass
        else:
            SUM += int(e)
    
    answer = SUM + MAX
    return answer
```
### 유사한 문제
이 문제에선 최댓값을 구하라고 하는데, 최솟값을 구하라는 문제가 백준에 있던 걸로 기억
