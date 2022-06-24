### 문제 정보
[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/12907)

### 접근법
먼저 가장 빨리 생각했던 방법이 재귀함수로 푸는 방법이였는데 100가지 동전의 조합을 구하는 것이기 때문에 시간 및 메모리가 초과된다.\
그래서 dp[n] 배열을 선언하고 동적 계획법으로 풀기로 했다. 늘 그렇듯이 동적 계획법으로 풀때 점화식을 구하는게 어려웠다.\
동전마다 자기의 값부터 영향을 끼치므로 for문의 범위를 값부터 n까지로 잡고\
이전 경우에 수에 더하는 것이므로 값을 압축하면 dp[p]+=dp[p-coin]라는 점화식이 나온다.
### 시간복잡도
동전종류만큼 for문을 돌리므로 O(mn)


### 공간복잡도
dp[n] 만금 저장하므로  O(n)


### 풀면서 놓쳤던점
2차원 배열에서 누적값으로 압축하여 1차원 배열로 표현할 수 있었음


### 이 문제를 통해 얻어갈 것
동적계획법, 점화식


### 코드
```python3
def solution(n, money):
    dp=[1]+[0]*n
    for coin in money:
        for p in range(coin,n+1):
            dp[p]+=dp[p-coin]
            dp[p]%=1000000007
    
    return dp[n]
```
### 유사한 문제
https://www.acmicpc.net/problem/2293
