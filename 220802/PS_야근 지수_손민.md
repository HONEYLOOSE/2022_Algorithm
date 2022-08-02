### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/12927)

### 접근법
제곱의 합의 최솟값을 구해야 하므로 가장 높은 수를 최대한 줄여야 한다.\
최대 힙에 모두 넣은 뒤 하나씩 빼서 1씩 감소시키면서 했다.\
파이썬에서 최대 힙이 없으므로 최소 힙에서 -1을 곱해서 최대힙을 만들었다.

### 시간복잡도
O(NlogM)

### 공간복잡도
O(N)

### 풀면서 놓쳤던점
더 어려운 알고리즘이 필요할 줄 알았는데 N이 생각보다 작아서 힙만으로도 구현이 됬다.

### 이 문제를 통해 얻어갈 것
최대 힙 사용법

### 코드
```python
def solution(arr):
import heapq

def solution(n, works):
    
    answer = 0
    heap=[]
    
    for w in works:
        heapq.heappush(heap,-1*w)        

    for i in range(0, n):
        t = heapq.heappop(heap)
        if t == 0:
            break
        heapq.heappush(heap, t+1)

    for h in heap:
        answer += pow(h * -1, 2)
        
    return answer
```
### 유사한 문제
