### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/70130)

### 접근법
각 숫자별로 앞뒤 원소중 하나를 포함해서 2개로 묶을수 있는 개수를 count 한다.
이 과정에서 [0, 1, 0] 처럼 같은 숫자가 사이의 원소를 공유하는 일이 없게 묶음을 셀 때 어떤 숫자로 했는지(이 경우엔 0) 배열에 check한다.

위 과정이 끝나고 count 배열의 가장 큰수x2 가 최장 스타수열의 길이가 된다.

### 시간복잡도
최악의 경우 3N으로 O(N)의 복잡도

### 공간복잡도
count와 check로 2N의 공간이 필요함

### 풀면서 놓쳤던점
순수 개수만 count 하고 상위부터 스타 수열에 포함될 수 있는 개수를 세는 방식도 가능했다.(전체 count 로도 현재 최대 스타수열보다 작으면 pass)

### 이 문제를 통해 얻어갈 것
구현 문제는 아니었고, 특정 알고리즘을 떠올리고 유도할 만한 문제도 아니었다. 알면 쉽게 풀고 모르면 못푸는 식의 문제.

### 코드
```python3
def solution(a):
    # 2개씩 묶을 수 있는 숫자의 개수
    count = [0 for i in a]
    # 묶음 체크. [0,1,0] 같은 경우 2개로 세는 것 방지
    check = [-1 for i in a]
    
    for n in range(len(a)):
        n_ = n-1;
        N = n+1;
        
        # 앞 숫자
        if n_>=0 and a[n_]!=a[n] and check[n_]!=a[n]:
            check[n_] = a[n]
            count[a[n]] += 1
            
        # 뒤 숫자
        elif N<len(a) and a[n]!=a[N] and check[N]!=a[n]:
            check[N] = a[n]
            count[a[n]] += 1
    
    answer = max(count)
    return answer*2

```
### 유사한 문제
