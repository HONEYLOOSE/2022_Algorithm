### 문제 정보
[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/64064){:target="_blank"}

### 접근법
불량 사용자인지 판단할 때는 정규표현식을 사용해서 처리했다.\
불량 사용자의 경우의 수를 구할때는 비트 마스킹을 이용해서 처리했다.\


### 시간복잡도
모든 경우의 수를 브루트 포스로 다 구하기 떄문에 O(n!)이 나온다\
최대값이 8이라 O(n!)으로도 잘 풀린다.


### 공간복잡도
visit에 비트마스크를 저장하므로 2<sup>8<sup/>


### 풀면서 놓쳤던점
visit에 그냥 True,False로 처리하면 될 줄 알았으나 중복처리가 안됬었다.


### 이 문제를 통해 얻어갈 것
간단한 정규표현식 사용법이랑 비트마스킹


### 코드
```python3
import re 

def solution(user_id, banned_id):
    new_b=[]
    for b in banned_id:
        new_b.append('^'+b.replace('*','.{1}')+'$')
    visit={}
    answer = 0
    def bruth(n,bit): #n은 banned_id의 인덱스, bit는 비트마스킹
        if n==len(banned_id):
            if bit not in visit:
                nonlocal answer
                visit[bit]=bit
                answer+=1
            return
        p=re.compile(new_b[n])
        for i in range(len(user_id)):
            if (1<<i)&bit==0 and p.match(user_id[i]): 
                bruth(n+1,(1<<i)|bit)
                
    bruth(0,0)
        
   
    return answer
```
