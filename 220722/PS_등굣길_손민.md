### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42898)

### 접근법
동적계획법\
최단 경로는 오른쪽이나 아래쪽으로만 가야 한다.\
맨 위와 왼쪽의 경로의 수는 1가지 밖에 없고 그 외에는 위와 왼쪽의 경로의 수를 더하면 된다.\
장애물도 고려해줘야한다.

### 시간복잡도
O(MN)

### 공간복잡도
O(MN)

### 풀면서 놓쳤던점
마지막에 1000000007로 나누는걸 깜빡했다.

### 이 문제를 통해 얻어갈 것
동적계획법

### 코드
```python
def solution(m, n, puddles):
    
    arr=[[0]*m for i in range(n)]
    
    for p in puddles:
        arr[p[1]-1][p[0]-1]=-1
        
    for i in range(m):
        if arr[0][i]==-1:
            break
        arr[0][i]=1
        
    for j in range(n):
        if arr[j][0]==-1:
            break
        arr[j][0]=1
        
    
        
    for i in range(1,m):
        for j in range(1,n):
            if arr[j][i]==-1:
                continue
            elif arr[j][i-1]==-1 and arr[j-1][i]==-1:
                continue
            elif arr[j][i-1]==-1:
                arr[j][i]=arr[j-1][i]
            elif arr[j-1][i]==-1:
                arr[j][i]=arr[j][i-1]
            else:
                arr[j][i]=arr[j][i-1]+arr[j-1][i]
            arr[j][i]%=1000000007

    answer = arr[n-1][m-1]
    
    return answer
```
### 유사한 문제
