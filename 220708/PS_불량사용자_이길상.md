### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/64064)

### 접근법
백트래킹 재귀 방식으로 banned_id에 매칭되는 user_id 순열을 생성한다. 순열 정보는 비트마스크 형태로 set에 저장하여 중복을 방지한다.

### 시간복잡도
O(N!M)

### 공간복잡도
백트래킹 스택 메모리

### 풀면서 놓쳤던점
중복체크 없이 순수 순열로 처리했다가 banned_id 순서가 달라도 같은 경우의 수로 처리한다는 것을 늦게 깨달음.

### 이 문제를 통해 얻어갈 것
순열,조합,백트래킹의 응용법

### 코드
```python3
def bt(user_id, banned_id, i, check, com_set):
    count = 0;
    
    if i == len(banned_id):
        if check in com_set:
            return 0;
        else:
            com_set.append(check)
            return 1;
    
    bid = banned_id[i]
    
    for idx,uid in enumerate(user_id):
        bit = 1<<idx
        if (check & bit) > 0:
            continue
        if len(bid) == len(uid):
            foo = True
            for j in range(len(bid)):
                if bid[j] == '*':
                    continue
                elif bid[j] != uid[j]:
                    foo = False
                    break
            if foo:
                check += bit
                count += bt(user_id, banned_id, i+1, check, com_set)
                check -= bit
    
    return count



def solution(user_id, banned_id):
    answer = bt(user_id, banned_id, 0, 0, [])
    
    return answer
```
### 유사한 문제
