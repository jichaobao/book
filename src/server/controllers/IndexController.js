const Index = require("../models/index");
import cheerio from "cheerio";
const {URLSearchParams} = require("url");
class IndexController{
    constructor(){}
    actionIndex(){
        return  async(ctx,next) => {
            //ctx.body = "hello";
            //SSR直接服务端渲染，灌到前台，crs是向后端发ajax，然后用js在本地操作dom
            const index = new Index();
            const result = await index.getData();
            const html =await ctx.render("books/pages/list",{
                data:result.data
            });
            if(ctx.requset.header["x-pjax"]){
                const $ =  cheerio.load(html);
                ctx.body = $("#js-hooks-data");
            }
            else{
                ctx.body=html;
            }
        }
    }
    actionAdd(){
        return  async(ctx,next) => {
            const html =await ctx.render("books/pages/add");
            if(ctx.requset.header["x-pjax"]){
                const $ =  cheerio.load(html);
                let _result="";//csr
                $(".pjaxcontent").each(function(){
                    _result += $(this).html();
                });
                
                $(".layload-css").each(function(){
                    _result += $(this).html();
                });
                $(".layload-js").each(function(){
                    _result += `<script src="${$(this).attr('src')}"></script>`;
                });
            }
            else{
                ctx.body=html;
            }
            
        }
    }
    actionSave(){
        return  async(ctx,next) => {
            const index = new Index();
            //构建表单的形式，formdata
            const paramas =new URLSearchParams();
            paramas.append("Books[name]","测试");
            paramas.append("Books[author]","测试111");
            const result = await index.saveData({
                paramas
            });
            ctx.body = result;
        }
        
    }
}
module.exports = IndexController;