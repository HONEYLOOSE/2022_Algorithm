### 문제 정보
[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/81303)

### 푼 방법
이중 연결 리스트

### 새로 알게 된 것
```
처음에 지워진걸 'X'로 그냥 위아래로 움직이면서 일일이 확인하는 방식으로 구현했더니 효율성에서 탈락을 했다.
표의 크기가 1,000,000이고 명령어의 개수가 200,000으로 크다 보니 시간 초과가 발생했었다.
연결리스트로 구현하여 delete된 표를 아예 확인하지 않는 형식으로 시간을 줄여서 풀었다.
```

### 코드
```python3
class node:
    def __init__(self,data,next=None,prev=None):
        self.data=data
        self.next=next
        self.prev=prev
class Dlink:
    def __init__(self):
        self.head=None
        self.tail=None
    def add(self,node):
        if self.head==None:
            self.head=node
            self.tail=node
        else:
            self.tail.next=node
            node.prev=self.tail
            self.tail=node
    def delete(self,node):
        if node==self.head:
            self.head=self.head.next
            self.head.prev=None
        elif node==self.tail:
            self.tail=self.tail.prev
            self.tail.next=None
        else:
            temp=node
            node.next.prev=node.prev
            temp.prev.next=node.next
            return temp
    def recover(self,node):
        if node.prev==None: #노드가 머리였다면
            self.head.prev=node
            self.head=node
        elif node.next==None: #노드가 꼬리였다면
            self.tail.next=node
            self.tail=node
        else:
            node.next.prev=node
            node.prev.next=node
            



def solution(n, k, cmd):
    answer = []
    dlink=Dlink()
    for i in range(n):
        dlink.add(node(i))
    
    del_list=[]
    cursor=dlink.head
    for i in range(k):
        cursor=cursor.next
    
    for c in cmd:
        #print(cursor.data)
        if c[0]=="D":
            temp=int(c.split(" ")[1])
            for i in range(temp):
                cursor=cursor.next
                    
        elif c[0]=="U":
            temp=int(c.split(" ")[1])
            for i in range(temp):
                cursor=cursor.prev
                    
        elif c[0]=='C':
            
            
            del_list.append(cursor)
            temp=cursor
            if cursor==dlink.tail:
                cursor=cursor.prev
            else:
                cursor=cursor.next
            dlink.delete(temp)
                    
        
        elif c[0]=='Z':
            dlink.recover(del_list.pop())
            
    temp=dlink.head
    for i in range(n):
        if not temp:
            answer.append('X')
        elif temp.data<=i:
            answer.append('O')
            temp=temp.next
        else:
            answer.append('X')
        
    
    return "".join(answer)
```
