### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/77486)

### 접근법
각각 부모가 누군지 저장을 한 뒤 예시처럼 이익의 10%를 위로 전달한다.

### 시간복잡도
O(M)=5&#42;1000000\
이익이 0이 되는 순간 위로 올려보내지 않으므로 100*100은 최대 4번 위로 올라간다.

### 공간복잡도
O(N+M) = 100000

### 풀면서 놓쳤던점
처음에 문제를 잘못 이해해서 다시 문제를 풀었음.\
최근에 이런 경우가 많은데 무작정 구현하기 보다는 문제를 꼼꼼이 읽어야겠음. 

### 이 문제를 통해 얻어갈 것
트리 구현

### 코드
```python3
def solution(enroll, referral, seller, amount):
    parent={}
    money={}
    money['-']=0
    
    for i in range(len(referral)):
        money[enroll[i]]=0
        if referral[i]=='-':
            parent[enroll[i]]='-'
        else:
            parent[enroll[i]]=referral[i]
               
    def go_up(name:str,m:int):
        money[name]+=m*90
        tax=m*10
        name=parent[name]
        
        while name !="-":
            money[name]+=tax
            tax=tax//10
            money[name]-=tax
            if tax<1:
                return
            name=parent[name]
            
    for i in range(len(seller)):
        go_up(seller[i],amount[i])
    
    answer = []
    for e in enroll:
        answer.append(money[e])
    return answer
```
### 유사한 문제
