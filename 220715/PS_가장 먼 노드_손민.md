### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/49189)

### 접근법
간선을 각각 정점 번호 리스트에 저장을 한뒤 끝까지 BFS를 한다

### 시간복잡도
O(VE)

### 공간복잡도
O(VE)

### 풀면서 놓쳤던점
딱히 없음

### 이 문제를 통해 얻어갈 것
간선 기반 BFS, 디큐 사용 방법

### 코드
```python3
from collections import deque

def solution(n, edge):
    edge_list=[]
    visit=[False]*(n+1)
    for i in range(n+1):
        edge_list.append([])
    for e in edge:
        edge_list[e[0]].append(e[1])
        edge_list[e[1]].append(e[0])
    
    visit[1]=True
    answer = 0
    
    def bfs(q):
        dq=deque()
        while len(q)!=0:
            cur= q.popleft()
            for e in edge_list[cur]:
                if visit[e]==False:
                    dq.append(e)
                    visit[e]=True
        return dq
    
    d=deque([1]) #1번 부터 시작
    
    while len(d)!=0:
        answer=len(d)
        d=bfs(d)

    return answer
```
### 유사한 문제
