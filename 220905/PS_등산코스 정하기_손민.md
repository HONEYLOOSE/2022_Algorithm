### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/118669)

### 접근법
BFS로 그래프를 탐색하고, BFS안에 큐 대신 우선순위 큐를 사용하여 intensity의 최소값을 비교하면서 풀었다.  
즉 우선순위 큐 안에 [최대 휴식시간, 산봉우리 번호] 형식으로 최대 휴식시간이 현재 구한 intensity의 최소값보다 작거나 같을때만  
큐에다 넣으면서 풀었다.




### 시간복잡도
O(VE)지만 실제로는 중간에 intensity보다 큰 탐색을 진행하지 않기 때문에 괜찮다.

### 공간복잡도
O(N)+O(400000)

### 풀면서 놓쳤던점
사실 우선순위큐가 아니라 그냥 큐로도 풀릴 것 같다. \
구한 intensity보다 작을때에 continue로 넘어가야지 시간 초과가 나지 않는다.


### 이 문제를 통해 얻어갈 것
BFS

### 코드
```
from queue import PriorityQueue


def solution(n, paths, gates, summits):
    visit=[10000001]*(n+1)
    road=[[] for i in range(n+1)]
    q = PriorityQueue()
    
    for path in paths:
        road[path[0]].append([path[1],path[2]])
        road[path[1]].append([path[0],path[2]])
        
    for gate in gates:
        visit[gate]=0
        q.put([0,gate])
    intensity= 10000001
    summit=-1
    while q.empty()==False:
        top=q.get() #top[0]는 휴식시간  top[1]은 산봉우리 번호
        if top[0]<=intensity:
            if top[1] in summits:
                if top[0]<intensity:
                    summit=top[1]
                    intensity=top[0]
                elif top[0]==intensity: #최소값이 같다면 더 작은 산봉우리 번호
                    summit=min(top[1],summit)
                continue #만약 산봉우리면 더이상 나아가지 않는다
                    
            for r in road[top[1]]:  #road[지금]=[[도착,시간]...]  
                if r[1]<visit[r[0]] : #r[1]=시간 r[0]=목적지
                    visit[r[0]]=r[1]
                    if r[1]>top[0]:
                        q.put([r[1],r[0]])
                    else:
                        q.put([top[0],r[0]])
    
    answer = [summit,intensity]
        
    return answer
```
### 유사한 문제
