((w)=> {
    /**
     * swiper-wrap
     * swiper-item
     *
     * @param swiper 必须的参数
     * @param options  ： {
     *     icons 小圆点的包裹元素的类 字符串
     *    isAutoplay  是否自动轮播 布尔值 默认false
     *      delay 延时多少,单位毫秒 默认2000
     *      autoplayTransition:自动轮播的过渡时间 单位毫秒 默认时间500ms
     *      slideTransition：滑动轮播图的过渡时间 单位毫秒 默认时间500ms
     * }
     */
    if (!w.G_G){
        w.G_G = {}
    }
    w.G_G.mLunbo =
       function (swiper, options) {

            //swiper是必需的
            if (!swiper) {
                console.error('参数swiper必需的,不能省略');
                return
            }

            //options
            let icons = options.icons;
            let isAutoplay = options.isAutoplay;
            let delay = options.delay || 2000;
            let autoplayTransition = options.autoplayTransition || 500;
            let slideTransition = options.slideTransition || 500

           let transformCss = G_G.transformCss;

            //轮播延时至少比过渡时间大150ms，需要留一些定时器的空余以及偷偷切换图片的时间
            if (delay < autoplayTransition + 150) {
                console.error('轮播延时至少比过渡时间大150ms');
                return
            }

            //业务
            let swiperWrap = swiper.querySelector('.swiper-wrap');
            // let swiper = document.querySelector('.swiper');
            let swiperItems = swiper.querySelectorAll('.swiper-item');
            let itemLength = swiperItems.length;
            let itemWidth = swiper.clientWidth;
            let currentPage = itemLength;
            let pointers;
            if (icons) {
                let iconswrap = swiper.querySelector('.' + icons);
                let iconsinner = '';
                for (let i = 0; i < itemLength; i++) {
                    //注意这里字符串最后有一个空格，不带空格，点会挤一块
                    iconsinner += `<span></span> `;
                }
                iconswrap.innerHTML = iconsinner;
                pointers = swiper.querySelectorAll('.' + icons + ' span');
            }
            let lunboId;

            swiperWrap.style.width = swiperItems.length * 200 + '%';

            swiperWrap.innerHTML += swiperWrap.innerHTML;

            swiperItems = document.querySelectorAll('.swiper-item');

            swiperItems.forEach(function (item) {
                item.style.width = 100 / swiperItems.length + '%';
            });

            setCurrent(currentPage);
            autoplay(isAutoplay, delay);


            window.addEventListener('load', function () {
                swiper.style.height = swiperItems[0].offsetHeight + 'px';
            });

            /**
             * 记录初始位置
             */
            swiperWrap.addEventListener('touchstart', function (e) {
                autoplay(false);
                swiperWrap.style.transition = '0s';
                if (currentPage <= 0) {
                    setCurrent(itemLength);
                }
                if (currentPage >= swiperItems.length - 1) {
                    setCurrent(itemLength - 1);
                }
                swiperWrap.startX = e.changedTouches[0].clientX;
                swiperWrap.startY = e.changedTouches[0].clientY;
                swiperWrap.posX = transformCss(swiperWrap, 'translateX');
                swiperWrap.beginTime = (new Date).getTime();
                swiperWrap.isHorizontal = true;
                swiperWrap.isFrist = true;

            });


            /**
             * 左右划移动
             */
            swiperWrap.addEventListener('touchmove', function (e) {

                let dalteX = e.changedTouches[0].clientX - swiperWrap.startX;
                let dalteY = e.changedTouches[0].clientY - swiperWrap.startY;

                //判断运动方向
                if (swiperWrap.isFrist) {
                    if (Math.abs(dalteX) < Math.abs(dalteY)) {//纵向
                        swiperWrap.isHorizontal = false;
                    }
                }

                if (swiperWrap.isHorizontal) {
                    //横向移动
                    let left = swiperWrap.posX + dalteX;
                    //以动画移动
                    e.preventDefault();
                    transformCss(swiperWrap, 'translateX', left);
                }

            });

            /**
             * 左右划过一屏
             */
            swiperWrap.addEventListener('touchend', function (e) {
                autoplay(true);
                swiperWrap.style.transition = slideTransition + 'ms';

                //一次滑动的时间
                let durt = (new Date).getTime() - swiperWrap.beginTime;

                if (durt < 500) {
                    if (transformCss(swiperWrap, 'translateX') - swiperWrap.posX > 0) {
                        setCurrent(--currentPage);
                    } else {
                        setCurrent(++currentPage);
                    }
                } else {
                    currentPage = -1 * Math.round(transformCss(swiperWrap, 'translateX') / itemWidth);
                    setCurrent(currentPage);
                }
            });


            /*轮播过渡结束后从最右边切换到中间*/
            swiperWrap.addEventListener('transitionend', function (e) {
                if (currentPage >= swiperItems.length - 1) {
                    swiperWrap.style.transition = '0s';
                    setCurrent(itemLength - 1);
                }
            });

            /**
             * 设置当前显示页面
             * @param index
             */
            function setCurrent(index) {
                let left = index * itemWidth;
                transformCss(swiperWrap, 'translateX', -left);
                if (pointers) {
                    pointers.forEach(function (item, iconIndex) {
                        item.classList.remove('active');
                        if (index % itemLength === iconIndex) item.classList.add('active');
                    });

                }
                currentPage = index;
                // console.log(currentPage);
            }

            /**
             * 自动轮播
             * @param isAutoPlay
             * @param delay
             */
            function autoplay(isAutoPlay, delay) {
                if (isAutoPlay) {
                    // 自动轮播
                    lunboId = setInterval(function () {
                        swiperWrap.style.transition = autoplayTransition + 'ms';
                        currentPage++;
                        setCurrent(currentPage);
                    }, delay);
                } else {
                    if (lunboId)
                        clearInterval(lunboId);
                }
            }


        };
})(window);