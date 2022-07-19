### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/12983)

### 접근법
트라이 + DP

### 시간복잡도


### 공간복잡도

### 풀면서 놓쳤던점

### 이 문제를 통해 얻어갈 것


### 코드
```python
def solution(strs, t):
    # 트라이
    trie = {}
    
    # 트라이 초기화
    for s in strs:
        node = trie
        for ch in s:
            if ch not in node:
                node[ch] = {}
                pass
            node = node[ch]
        node['*'] = 0
    
    L = len(t)
    
    #dp 배열
    way = [30000 for i in range(L+1)]
    # way[i]: 0위치부터 i 위치까지 way[i] 개의 단어 조각으로 도달 가능.
    way[0] = 0
    
    for i in range(L):
        cost = way[i]
        if cost == 30000: continue
        
        node = trie
        idx = i
        while idx<L and t[idx] in node:
            node = node[t[idx]]
            idx+=1
            if '*' in node:
                way[idx] = min(way[idx], cost + 1)
                
    
    answer = way[L]
    if answer == 30000: answer = -1

    return answer
```
### 유사한 문제
