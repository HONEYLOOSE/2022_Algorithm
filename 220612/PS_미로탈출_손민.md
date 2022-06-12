### 문제 정보
[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/43238)

### 푼 방법
비트마스킹 + bfs

### 새로 알게 된 것
```
함정의 발동 상황을 비트마스킹 하고 정방향과 역방향의 길을 조건에 따라 코드를 잘 작성해야 했다.
```

### 코드
```c++
#include <vector>
#include <algorithm>
#include <string>
#include <iostream>
#include <queue>

using namespace std;


struct road {
	int dest, time;
	road(int a, int b)
	{
		dest = a, time = b;

		cout << "dest=" << dest << " time=" << time << endl;
	}
	road()
	{
		dest = 0, time = 0;
	}
};
struct pos {
	int cur, time, trap;
	pos(int a, int b, int c)
	{
		cur = a, time = b, trap = c;
	}
};

int get_trap_index(int t, vector<int> & traps)
{
	for (int i = 0; i < traps.size(); i++)
	{
		if (traps[i]-1 == t)
		{
			return i;
		}
	}
	return -1;
}



int solution(int n, int start, int end, vector<vector<int>> roads, vector<int> traps) {
	vector<vector<road>> edge(n + 1, vector<road>(0));

	vector<vector<road>> Redge(n + 1, vector<road>(0));
	vector<vector<int>> dp(n + 1, vector<int>(1024, 2147483647));
	int answer = 2147483647;
	for (int i = 0; i<roads.size(); i++)
	{
		cout << i << endl;
		cout << roads[i][0]<<" "<<roads[i][1] << " " << roads[i][2] << endl;
		edge[roads[i][0]-1].push_back(road(roads[i][1]-1, roads[i][2]));
		Redge[roads[i][1]-1].push_back(road(roads[i][0]-1, roads[i][2]));
	}
	queue<pos> q;
	q.push(pos(start-1, 0, 0));
	dp[start-1][0] = 0;
	while (!q.empty())
	{
		pos p = q.front();
		if (p.cur == end-1)
		{
			answer = min(p.time, answer);
		}
		int current_trap_index = get_trap_index(p.cur, traps);
		/*

		크게 보자면

		1.현재가 함정이고 발동이 됬다면
      edge에서 도착지가 함정이고 발동이 됬다면
      redge에서 도착지가 함정이 아니거나 발동이 안됬다면
		2.현재가 함정이 아니거나 발동이 안됬다면
      edge에서 도착지가 함정이 아니거나 발동이 안됬다면
      redge에서 도착지가 함정이고 발동이 됬다면
    

		
		*/
		if (current_trap_index >= 0 && (p.trap&(1 << current_trap_index)) != 0)//현재가 트랩이고 발동이 되어 있다면
		{
			for (int i = 0; i<edge[p.cur].size(); i++)
			{
				int dest_trap_index = get_trap_index(edge[p.cur][i].dest, traps);


				if (dest_trap_index>=0&&(((1 << (dest_trap_index))&p.trap) != 0)&& dp[edge[p.cur][i].dest][(p.trap ^ (1 << (dest_trap_index)))]>p.time + edge[p.cur][i].time) // 목적지도 발동되어 있고
				{
					q.push(pos(edge[p.cur][i].dest, p.time + edge[p.cur][i].time, p.trap ^ (1 << (dest_trap_index))));
					dp[edge[p.cur][i].dest][(p.trap ^ (1 << (dest_trap_index)))] = p.time + edge[p.cur][i].time;
				}
			}

			for (int i = 0; i<Redge[p.cur].size(); i++)
			{
				int dest_trap_index = get_trap_index(Redge[p.cur][i].dest, traps);
				if (dest_trap_index<0||(dest_trap_index>=0&&(p.trap&(1 << (dest_trap_index))) == 0)) //도착지가 뒤바뀐 상태가 아니라면
				{
					
						if (dest_trap_index>=0)  //만약 도착지가 함정이라면
						{
							if (dp[Redge[p.cur][i].dest][(p.trap | (1 << (dest_trap_index)))] > p.time + Redge[p.cur][i].time) // 시간이 더 작으면
							{
								q.push(pos(Redge[p.cur][i].dest, p.time + Redge[p.cur][i].time, p.trap | (1 << (dest_trap_index))));
								dp[Redge[p.cur][i].dest][(p.trap | (1 << (dest_trap_index)))] = p.time + Redge[p.cur][i].time;
							}
						}
						else //만약 도착지가 함정이 아니라면
						{
							if (dp[Redge[p.cur][i].dest][p.trap] > p.time + Redge[p.cur][i].time) // 시간이 더 작으면
							{
								q.push(pos(Redge[p.cur][i].dest, p.time + Redge[p.cur][i].time, p.trap));
								dp[Redge[p.cur][i].dest][p.trap] = p.time + Redge[p.cur][i].time;
							}
						}

					
				}

			}

		}
		else //현재가 트랩 상태가 아니라면
		{
			for (int i = 0; i<edge[p.cur].size(); i++)
			{
				int dest_trap_index = get_trap_index(edge[p.cur][i].dest, traps);

				
					if (dest_trap_index >= 0 && (p.trap&(1 << (dest_trap_index))) == 0)  //만약 도착지가 함정이라면 && 도착지가 뒤바뀐 상태가 아니라면
					{
						if (dp[edge[p.cur][i].dest][(p.trap | (1 << (dest_trap_index)))] > p.time + edge[p.cur][i].time) // 시간이 더 작으면
						{
							q.push(pos(edge[p.cur][i].dest, p.time + edge[p.cur][i].time, p.trap | (1 << (dest_trap_index))));
							dp[edge[p.cur][i].dest][(p.trap | (1 << (dest_trap_index)))] = p.time + edge[p.cur][i].time;
						}
					}
					else
					{
						if (dp[edge[p.cur][i].dest][p.trap] > p.time + edge[p.cur][i].time) // 시간이 더 작으면
						{
							q.push(pos(edge[p.cur][i].dest, p.time + edge[p.cur][i].time, p.trap));
							dp[edge[p.cur][i].dest][p.trap] = p.time + edge[p.cur][i].time;
						}
					}
				
			}

			for (int i = 0; i<Redge[p.cur].size(); i++)
			{
				int dest_trap_index = get_trap_index(Redge[p.cur][i].dest, traps);
				if ((p.trap&(1 << (dest_trap_index))) != 0) //도착지가 뒤바뀐 상태가 라면
				{
					if (dp[Redge[p.cur][i].dest][(p.trap ^ (1 << (dest_trap_index)))]>p.time + Redge[p.cur][i].time) // 시간이 더 작으면
					{
						q.push(pos(Redge[p.cur][i].dest, p.time + Redge[p.cur][i].time, p.trap ^ (1 << (dest_trap_index))));
						dp[Redge[p.cur][i].dest][(p.trap ^ (1 << (dest_trap_index)))] = p.time + Redge[p.cur][i].time;

					}
				}

			}
		}


		q.pop();

	}


	return answer;
}

```
