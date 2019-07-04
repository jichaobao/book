import "./add.css";
const add ={
        init(){
                //帮助分析组件的css，帮助分析组件用到的js
                console.log("add组件对应的入口文件");
                xtag.create('x-add', class extends XTagElement {
                        constructor(){
                                super();
                                console.log("初始化的操作");
                                this.data={
                                        user:"little cat"
                                };
                        }
                        '::template(true)' (){
                          return `<form>
                          <div class="form-group">
                            <label for="exampleInputEmail1">书名</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="请输入书名">
                          </div>
                          <div class="form-group">
                            <label for="exampleInputPassword1">作者</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="输入作者">
                          </div>
                          <button id="add-button" type="button" class="btn btn-primary">Submit</button>
                        </form>`
                        }
                        "click::event"(e){
                                if(e.target=="add-btn"){
                                        alert("请求开始");
                                }
                        }
                 });
        }
}
export default add;