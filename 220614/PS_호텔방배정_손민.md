### 문제 정보
[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/64063)

### 접근법
표 편집이랑 유사한 문제였다.\
연속된 구간의 끝 값을 구할 때 리스트에서 일일히 배열로 접근하면 시간복잡도가 N 이지만 연결리스트로 구현하여 tail 만 확인하면 1로 준다.\
호텔 방에 배정을 할때 원하는 방이 비어있으면 바로 넣고 밑 번호나 윗 번호를 확인하여 존재하면 합치고\
원하는 방이 이미 차 있으면 이중 연결 리스트의 tail+1에 방을 배정하고 윗번호를 확인하여 존재하면 합치는 형식으로 구현했다.

다른 사람의 풀이를 보니 union과 find로 더 간단하게 풀 수 있음

### 시간복잡도
방이 비어있는지 확인하는 건 O(1)이고 이중 연결 리스트 끼리 합칠때 뒤에 있는 리스트의 길이만큼 업데이트 하므로 O(N)이다.\
room_number이 200000이므로 O((1+200000)<sup>2</sup>/2)이긴 한데 다행히 그런 케이스는 없던것 같다.


### 공간복잡도
k의 값이 10<sup>12</sup>이 넘어가기에 그냥 k크기의 리스트로 만들면 메모리 에러가 발생해서 딕셔너리로 visit을 구성해야 했다.

### 풀면서 놓쳤던점
공간복잡도를 생각하지 않아 런타임 에러가 발생해 당황함.


### 이 문제를 통해 얻어갈 것
이중 연결리스트를 구현하는 방법


### 코드
```python3
class node:
    def __init__(self,data,next=None,prev=None):
        self.data=data
        self.next=next
        self.prev=prev
class Dlink:
    def __init__(self,node=None):
        self.head=node
        self.tail=node
    def add(self,node):
        node.prev=self.tail
        self.tail.next=node
        self.tail=node
    def merge(self,dlink):
        self.tail.next=dlink.head
        dlink.head.prev=self.tail
        self.tail=dlink.tail
        dlink.head=self.head
    def print(self):
        temp=self.head
        while temp:
            print(temp.data)
            temp=temp.next
    

def solution(k, room_number):
    
    answer = []
    visit={}
    dlink_list=[]
    for r in room_number:
        
        if not r in visit:
            answer.append(r)
            visit[r]=len(dlink_list)
            dlink_list.append(Dlink(node(r)))
            
            if r-1 in visit:
                dlink_list[visit[r-1]].merge(dlink_list[visit[r]])
                visit[r]=visit[r-1]
                
            if r+1 in visit:
                temp = visit[r+1]
                dlink_list[visit[r]].merge(dlink_list[visit[r+1]])
                while r+1 in visit and temp==visit[r+1]:
                    visit[r+1]=visit[r]
                    r+=1
                
        else:
            tdlink=dlink_list[visit[r]]
            tdata=tdlink.tail.data
            tdlink.add(node(tdata+1))
            answer.append(tdata+1)
            visit[tdata+1]=visit[r]
            if tdata+2 in visit:
                temp = visit[tdata+2]
                tdlink.merge(dlink_list[visit[tdata+2]])
                while tdata+2 in visit and temp==visit[tdata+2]:
                    visit[tdata+2]=visit[r]
                    tdata+=1

    
    return answer
```
