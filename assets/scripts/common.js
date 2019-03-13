function yd(){}
yd._version = 0.1;
yd.throttle = function(fn,wait){
    var timer;
    //返回一个纯函数，接收上面所有的参数
    return function(...args){
        if(!timer){
            timer = setTimeout(()=>timer = null,wait);
            return fn.apply(this,args);
        }
    }
}