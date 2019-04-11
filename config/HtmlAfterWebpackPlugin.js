//webpack插件
//1.何时才能拦截最后生成的swig
//2.如何分清这个swig文件对应的js和css
const pluginName = 'HtmlAfterWebpackPlugin';
const assetsHelp = (data) => {
        let js = [];
        let css=[];
        const dir = {
                js:item=>`<script class="layload-js" src="${item}"></script>`,
                css:item=>`<link class="layload-css" rel="stylesheet" href="${item}">`
        }
        for(let jsitem of data.js){
                js.push(dir.js(jsitem));
        }

        for(let cssitem of data.css){
                css.push(dir.css(cssitem));
        }
        return {js,css};
}
class HtmlAfterWebpackPlugin {
  apply(compiler) {
//普通插件写法
//     compiler.hooks.run.tap(pluginName, compilation => {
//       console.log('The webpack build process is starting!!!');
//     });
        //挂载到htmlwebpackplugin生命周期中插件的写法
        compiler.hooks.compilation.tap(pluginName, compilation => {
                compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName,htmlPluginData=>{
                        let _html = htmlPluginData.html;
                        const result = assetsHelp(htmlPluginData.assets);
                        _html.replace(/pages:/g,"../../");
                        _html.replace(/components:/g,"../../../components/");
                        _html.replace("<!--injectjs-->",result.js.join(""));
                        _html.replace("<!--injectcss-->",result.css.join(""));
                        htmlPluginData.html=_html;
                        //console.log(htmlPluginData);
                });
        });
  }
}
module.exports=HtmlAfterWebpackPlugin;