### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42891)

### 접근법

효율성을 만족하기 위해서는 음식을 크기로 정렬을 한다.  
그리고 시간이 될때까지 음식을 작은것부터 없앤다음 남은 음식을 인덱스 기준으로 정렬한다.  
마지막에 남은 시간을 남은 음식으로 나눈 나머지를 정렬한 리스트에 넣으면 정답이 나온다.  
자세한 건 다음 유투브로 [유투브 링크](https://www.youtube.com/watch?v=zpz8SMzwiHM)



### 시간복잡도
O(NlogN)

### 공간복잡도
O(N)

### 풀면서 놓쳤던점
마지막에 남은 음식을 인덱스 기준으로 정렬하는 걸 이해하는게 좀 힘들었다.


### 이 문제를 통해 얻어갈 것
문제를 잘 이해하여 수학적으로 접근하기

### 코드
```
def solution(food_times, k):
    answer = 0
    sorted_food_times=[[n,idx+1]  for idx, n in enumerate(food_times)]
    sorted_food_times=sorted(sorted_food_times)
    time=0
    idx=0
    past=0
    while True:
        
        if idx>=len(food_times): #더 섭취해야 할 음식이 없다면
            return -1
        time+=(len(food_times)-idx)*(sorted_food_times[idx][0]-past)
        if time>k: # 음식을 먹다가 시간이 다 되면
            time-=(len(food_times)-idx)*(sorted_food_times[idx][0]-past)
            break
        past=sorted_food_times[idx][0]
        idx+=1
    temp_list=sorted(sorted_food_times[idx:],key=lambda x : x[1]) #남은 음식들을 인덱스 기준으로 정렬
    temp_idx=(k-time)%(len(food_times)-idx) # 남은 시간을 남은 음식의 수로 나눈 나머지
    answer=temp_list[temp_idx][1]
    
        
        
    return answer
```
### 유사한 문제
