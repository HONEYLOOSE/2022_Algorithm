### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/43163)

### 접근법
단어를 하나씩 다른 단어로 BFS를 진행한다.

### 시간복잡도
O(N^2)

### 공간복잡도
O(N)

### 풀면서 놓쳤던점
딱히 없음

### 이 문제를 통해 얻어갈 것
BFS, 디큐 사용 방법

### 코드
```python3
from collections import deque
def solution(begin, target, words):
    answer = 0
    
    def can_change(a:str, b:str): #변환이 가능한가
        diff=0
        for i in range(len(a)):
            if a[i]!=b[i]:
                diff+=1
        if diff==1:
            return True
        else:
            return False
        
    def bfs(dq):
        ret=deque()
        for w in dq:
            for i in range(len(words)):
                if visit[i]==False and can_change(w,words[i]):
                    ret.append(words[i])
                    visit[i]=True
        return ret
    
    visit=[False]*len(words)
    
    
    dq=deque([begin])
    
    while len(dq)!=0:
        answer+=1
        dq=bfs(dq)
        if target in dq: #타겟이 있으면
            return answer

    return 0
```
### 유사한 문제
가장 먼 노드
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/49189)
