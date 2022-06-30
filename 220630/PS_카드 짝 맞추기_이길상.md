### 문제 정보
[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/72415)

### 접근법
카드쌍 중 하나를 선택했다면 그 다음엔 무조건 짝이 맞는 다른 하나를 선택해야 하기 때문에, 순열을 통해 선택할 카드쌍 순서의 모든 조합을 만들고 백트래킹으로 모든 경우의 수를 확인한다.
현재 위치에서 각 카드쌍위치로 이동하는 최적의 cost는 BFS로 계산한다.

### 시간복잡도


### 공간복잡도


### 풀면서 놓쳤던점
중간에 백트래킹을 포기하고 순수 BFS를 시도했으나 너무 복잡했다..

### 이 문제를 통해 얻어갈 것
구현 실력


### 코드
```python3
def solution(board, r, c):
    cards = {}
    answer = 100_000_000
    
    for i in range(4):
        for j in range(4):
            e = board[i][j]
            if e > 0:
                if e in cards:
                    cards[e].append([i,j])
                else:
                    cards[e] = [[i,j]]
    
    def permutation(x, y, count, len, i, check):
        nonlocal board
        nonlocal answer
        
        if i == len:
            answer = min(answer, count)
            return
        
        for j in range(len):
            # 카드쌍 뒤집기
            if not check[j]:
                check[j] = True
                
                start = cards[j+1][0]
                end = cards[j+1][1]
                
                # (x,y) -> start -> end
                C = count
                C += cost(x, y, start[0], start[1])
                C += cost(start[0], start[1], end[0], end[1])
                
                board[end[0]][end[1]] = board[start[0]][start[1]] = 0
                permutation(end[0], end[1], C+2, len, i + 1, check)
                board[end[0]][end[1]] = board[start[0]][start[1]] = j+1
                
                # (x,y) -> end -> start         
                C = count
                C += cost(x, y, end[0], end[1])
                C += cost(end[0], end[1], start[0], start[1])
                
                board[end[0]][end[1]] = board[start[0]][start[1]] = 0
                permutation(start[0], start[1], C+2, len, i + 1, check)
                board[end[0]][end[1]] = board[start[0]][start[1]] = j+1
                
                check[j] = False
                
    # bfs
    def cost(x, y, p, q):
        dx = [1,-1,0,0]
        dy = [0,0,1,-1]
        queue = [[x, y, 0]]
        check = [[False for i in range(4)] for j in range(4)]
        check[x][y] = True
        
        while len(queue)>0:
            x, y, t = queue.pop(0)
            
            if x == p and y == q:
                return t
            
            for i in range(4):
                nx = x+dx[i]
                ny = y+dy[i]
                
                if nx<0 or nx>3 or ny<0 or ny>3: continue
                if check[nx][ny]: continue
                
                check[nx][ny]  = True
                queue.append([nx,ny,t+1])
            
            for i in range(4):
                nx = x
                ny = y
                while True:
                    nx = nx+dx[i]
                    ny = ny+dy[i]
                    if nx<0 or nx>3 or ny<0 or ny>3: 
                        nx -= dx[i]
                        ny -= dy[i]
                        break
                    if board[nx][ny] >0:
                        break

                if check[nx][ny]: continue
                
                check[nx][ny]  = True
                queue.append([nx,ny,t+1])

    
    L = len(cards)
    permutation(r, c, 0, L, 0, [False for i in range(L)])
    
    return answer
```
### 유사한 문제
