# 문제 정보
리트코드 EASY

[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

# 접근법
buyingPrice를 별도로 저장하고 maxProfit을 갱신하는 식으로 구현
```javascript
var maxProfit = function(prices) {
    let buyingPrice = prices[0];
    let maxProfit = 0;
    for(let i = 1; i < prices.length; i++) {
        if(prices[i] < buyingPrice) {
            buyingPrice = prices[i];
        } else {
            if(maxProfit < prices[i] - buyingPrice) {
                maxProfit = prices[i] - buyingPrice;
            }
        }
    }
    return maxProfit;
};
```

# 배운 점
딱히 없음
