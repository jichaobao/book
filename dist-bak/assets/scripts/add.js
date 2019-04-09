// var app6 = new Vue({
//     el: '#app-6',
//     data: {
//       message: 'Hello Vue!'
//     }
//   })
class Create{
    constructor(){
        this.btn=$("#js-btn");
    }
    fn(){
        this.btn.click(yd.throttle(function(){
            console.log("点击");
        },500));
    }
}
export default Create;