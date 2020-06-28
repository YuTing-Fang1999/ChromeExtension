### 背景介紹  
網址旁邊如果有個鎖，就代表是用https傳輸，資料會加密   
![](https://i.imgur.com/xU38m3q.png)   

但如果是用http傳的話，資料不會被加密，就可以使用SSLstrip攻擊，擷取你的傳輸資料   
![](https://i.imgur.com/oQcgHHQ.png)   

### 目的
把所有書籤裡原本網址是http的改成https(如果該網站有支援的話)   

### 作法
遍歷所有書籤裡的url，如果是http就用https get看看，如果get成功就把url修改成https   

### 功能介紹  
可以把所有書籤裡的內容列出來，預設是列出使用http get的書籤   
![](1.png)   
有三種分類可選
![](https://i.imgur.com/Zr5TV8R.png)   

按這個按鈕就能將http轉為https   
![](https://i.imgur.com/g0QPV4A.png)   

### 驗證
將書籤的網址編輯成http   
![](https://i.imgur.com/YgkAd5a.png)   
成功出現在http的分類  

![](https://i.imgur.com/3wz7RAu.png)  
按下按鈕後  
![](https://i.imgur.com/bHn7sLT.png)  

顯示ok並且跑回https的分類  
![](https://i.imgur.com/2EovlDl.png)  

網址也被成功改回https  
![](https://i.imgur.com/AuQav6c.png)  
