# moblieCarousel-encapsulation
封装移动端轮播图
# Quick Start

## 项目结构

|--项目名

  |--css
  
  |   |--reset.css
  
  |   |--m-lunbo.css
  
  |--img
  
  |   |--你的图片.jpg
  
  |   |--你的图片.jpg
  
  |--js
  
  |   |--m-lunbo.js
  
  |   |--transfrom.js
  
  |   |--demo.js
  
  |--demo.js


## HTML
* 设置理想视口
```  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,viewport-fit:cover"> ```

* 引入css文件

``` 
    <!--    reset-->
    <link rel="stylesheet" href="css/reset.css">
    <!--    轮播css样式-->
    <link rel="stylesheet" href="css/m-lunbo.css">
```

* 引入js文件
```
<!--    轮播实现文件的依赖-->
    <script src="js/transform.js"></script>
<!--    轮播实现文件-->
    <script src="js/m-lunbo.js"></script>
<!--    这个是你的js文件-->
    <script src="js/demo.js"></script>
```

* 写入轮播元素
```
<!--        轮播容器，必选-->
        <div class="swiper">
<!--            类名固定，必选-->
            <ul class="swiper-wrap">
<!--                类名固定，写入自己的图片的路径，必选，图片数量自定义-->
                <li class="swiper-item"><img src="img/1.jpg" alt=""></li>
                <li class="swiper-item"><img src="img/2.jpg" alt=""></li>
                <li class="swiper-item"><img src="img/3.jpg" alt=""></li>
                <li class="swiper-item"><img src="img/4.jpg" alt=""></li>
                <li class="swiper-item"><img src="img/5.jpg" alt=""></li>
            </ul>
<!--            轮播点，可选-->
            <div class="icons"></div>
        </div>
 ```
 
 ## 调用js方法实现轮播
 
 ```
    (()=>{
      //dom结构渲染完成
        document.addEventListener('DOMContentLoaded',function(){
            //业务
            //取得轮播图容器
            let swiper = document.querySelector('.swiper');
            //调用轮播方法，传入轮播容器，以及可选参数
            G_G.mLunbo(swiper,{isAutoplay:true,icons:'icons'});
        });
    })();
 ```
 
 ## 轮播方法可选参数
 ```
     /**
     * 移动端轮播方法
     * @param swiper 必须的参数
     * @param options  ： {
     *      icons 小圆点的包裹元素的类 字符串
     *      isAutoplay  是否自动轮播 布尔值 默认false
     *      delay 延时多少,单位毫秒 默认2000
     *      autoplayTransition:自动轮播的过渡时间 单位毫秒 默认时间500ms
     *      slideTransition：滑动轮播图的过渡时间 单位毫秒 默认时间500ms
     * }
     */
     w.G_G.mLunbo = function (swiper, options){...};
 ```
 
