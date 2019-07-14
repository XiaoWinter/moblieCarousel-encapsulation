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