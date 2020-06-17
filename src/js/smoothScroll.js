import BezierEasing from "bezier-easing";
export const smoothScroll = function(target) {
  let targetOffsetTop;
  //可传入dom id或者offsetTop值
  if (typeof target === "string") {
    targetOffsetTop = document.getElementById(target).offsetTop;
  }
  if (typeof target === "number") {
    targetOffsetTop = target;
  }
  let startOffsetTop =
    document.documentElement.scrollTop || document.body.srcollTop||0;
    
  let diff = targetOffsetTop - startOffsetTop;
  let duration=400;
  // if(diff<=200){
  //   duration=400
  // }else if(diff<=800){
  //   duration = 700
  // }else if(diff<=1200){
  //   duration = 1000
  // }else{
  //   duration = 1200
  // }
  let start;
  const easing = BezierEasing(0.6, 0.3, 0.3, 0.6);
  //循环滑动滚动条 
  window.requestAnimationFrame(function step(timestamp) {
    timestamp = Date.now();
    if (!start) start = timestamp;
    var time = timestamp - start;
    var percent = Math.min(time / duration, 1);
    window.scrollTo(0, startOffsetTop + diff * easing(percent));
    if (time < duration) {
      window.requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        //节流目录跟随优化，必须要把最终的值传递出来
        if (diff > 0) {
          window.scrollTo(0, targetOffsetTop + 5);
        }
      }, 100);
    }
  });
};
