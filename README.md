# node-crawler
一个爬取boss直聘职位里公司位置信息并在地图上显示的爬虫和一个自动发送微信问候的脚本

**目录简介**

 - pachong.js：爬取boss直聘web页面北京所有前端职位的详情链接，公司名称，并保存到根目录data.json文件
 - map.js：读取根目录data.json，遍历爬取详情页面，获取公司地址，并调用百度地图地址解析api获取经纬度，最终得到修改后的json文件并保存
 - server.js：简易的http服务器，为静态文件map.html起http服务
 - map.html：Ajax读取根目录json文件，调用百度地图api，生成地图，并将爬取的公司位置点显示在地图上，得到一个简单的互联网公司位置分布密度图
 - wechat.js：一个定时自动给指定好友发送指定微信消息的脚本，主要是应用wechaty库调用web微信相关能力实现与微信的交互。
