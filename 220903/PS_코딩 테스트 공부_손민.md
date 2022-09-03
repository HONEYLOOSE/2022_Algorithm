### 문제 정보
[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/118668)

### 접근법
dp[alp][cop] =cost인 2차원 dp배열을 선언해서 풀었다.




### 시간복잡도
O(NMP)로 $150\times150\times100$을 해도 시간 초과가 발생하지 않는다. 

### 공간복잡도
O(NM)

### 풀면서 놓쳤던점
alp가 증가하면서 목표 alp를 넘게 되거나 시작 alp가 목표 alp보다 클 경우 등등\
생각보다 고려해야되는 조건들이 많았다.

### 이 문제를 통해 얻어갈 것
동적 계획법

### 코드
```
#include <string>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;



int solution(int alp, int cop, vector<vector<int>> problems) {
    
    int answer = 0;
    int goal_alp=-1;
    int goal_cop=-1;
    
    vector<vector<int>> dp(152,vector<int>(152,15000000000)); //dp[alp][cop] =cost 
    for(auto problem : problems) //problems의 원소는 [alp_req, cop_req, alp_rwd, cop_rwd, cost]
    {
        goal_alp=max(goal_alp,problem[0]);
        goal_cop=max(goal_cop,problem[1]);
    }
    if(alp>=goal_alp) alp=goal_alp;
    if(cop>=goal_cop) cop=goal_cop;
    
    dp[alp][cop]=0;
    for(int i=alp;i<=goal_alp;i++)
    {
        for(int j=cop;j<=goal_cop;j++)
        {
            dp[i+1][j]=min(dp[i+1][j],dp[i][j]+1);
            dp[i][j+1]=min(dp[i][j+1],dp[i][j]+1);
            
            for(auto p : problems) //problems의 원소는 [alp_req, cop_req, alp_rwd, cop_rwd, cost]
            {
                if(i>=p[0]&&j>=p[1])  // 문제를 푸는 것이 가능하면
                {
                    int ta=i+p[2];
                    int tc=j+p[3];
                    ta=min(ta,goal_alp);
                    tc=min(tc,goal_cop);
                    dp[ta][tc]=min(dp[ta][tc],dp[i][j]+p[4]);
                }
            }
            
        }
    }
    
    answer=dp[goal_alp][goal_cop];
        
    
    return answer;
}
```
### 유사한 문제
