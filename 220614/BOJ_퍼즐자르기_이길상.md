### 문제 정보
[문제 링크](https://www.acmicpc.net/problem/14727)

### 접근법
[히스토그램에서 가장 큰 직사각형](https://www.acmicpc.net/problem/6549)과 유사한 문제.
스택 활용 혹은 세그먼트 트리 + 분할 정복으로 풀 수 있다.

### 시간복잡도
세그먼트 트리 구성(n * log(n)) + 분할 정복(n * log(n))

### 공간복잡도
세그먼트 트리를 위한 4n 크기의 배열

### 풀면서 놓쳤던점
세그먼트 트리는 python으로 했더니 메모리 153488KB/ 시간	6220ms로 매우 비효율적이었다.
효율성 측면에서 놓친 부분이 있는듯.

### 이 문제를 통해 얻어갈 것
부족한 분할 정복 아이디어 채우기

### 코드
```Java
import java.util.*;
import java.io.*;

public class Main {
    static int[] data;
    static int[] tree;
    static int N;

    static int search(int node, int low, int high, int p, int q){
        if (p<= low && q>=high) return tree[node];
        if (low>q || high<p) return 0;
        
        int mid = (low+high)/2;

        int leftIdx = search(node*2, low, mid, p, q);
        int rightIdx = search(node*2+1, mid+1, high, p, q);

        return data[leftIdx] < data[rightIdx] ? leftIdx : rightIdx;
    }

    static long maxArea(int p, int q){
        if (q<p) return 0;
        if (p==q) return (long)data[p];

        int minIdx = search(1, 1, N, p, q);
        long sub = Math.max(maxArea(p, minIdx-1), maxArea(minIdx+1, q));
        
        return Math.max(sub, (long)data[minIdx]*(q-p+1));
    }

    public static void main(String[] args) throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));              
            
        N = Integer.parseInt(br.readLine());

        data = new int[N+1];
        tree = new int[4*N];
        data[0] = Integer.MAX_VALUE;

        // minimum index segment tree
        for (int i = 1; i <= N; i++) {
            int e = Integer.parseInt(br.readLine());
            data[i] = e;

            int node = 1;
            int low = 1, high = N;

            while(low < high){
                if(tree[node]== 0 || data[tree[node]]>e) tree[node] = i;

                int mid = (low+high)/2;
                if(mid>= i){ 
                    high = mid;
                    node = node*2;
                }
                else {
                    low = mid + 1;
                    node = node*2+1;
                }
            }

            tree[node] = i;
        }

        // divide n conquer
        System.out.println(maxArea(1, N));
    
    }
}
```

```Python3
import sys
sys.setrecursionlimit(10**7)

N = int(input())

# minimum index segment tree
tree = [0 for i in range(N * 4)]
data = [0 for i in range(N + 1)]
data[0] = 2_000_000_000

def search(node, low, high, p, q):
    if p<=low and q>= high : return tree[node]
    if low>q or high<p : return 0

    mid = (low + high) // 2

    left = search(node*2, low, mid, p, q)
    right = search(node*2+1, mid+1, high, p, q)

    if data[left] < data[right] : return left
    else : return right


def max_area(p, q):
    if p > q : return 0
    if p == q : return data[p]

    min_idx = search(1, 1, N, p, q)
    
    sub = max(max_area(p, min_idx-1), max_area(min_idx+1, q))

    return max(sub, data[min_idx] * (q-p+1))

for i in range(1, N+1):
    data[i] = int(input())

    # insert
    node = 1
    low = 1
    high = N

    while low < high:
        if tree[node] == 0 or data[i] < data[tree[node]]:
            tree[node] = i
        
        mid = (low + high) // 2

        if mid < i:
            low = mid + 1
            node = node*2+1
        else:
            high = mid
            node = node*2
    
    tree[node] = i
    
print(max_area(1, N))

```
