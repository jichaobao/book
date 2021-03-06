const Koa = require("koa");
const app = new Koa();
const path = require("path");
const co =require("co");
const render =require("koa-swig");
const serve=require("koa-static");
const errorHandle=require("./middlewares/errorHandler");
const log4js=require("log4js");
const config = require("./config");
//process.env.NODE_ENV ,这个值通过cross-env设置
//访问静态资源
app.use(serve(config.staticDir));
//swig
app.context.render = co.wrap(render({
    root: path.join(config.viewDir),
    autoescape: true, 
    cache: config.cacheMode, // disable, set to false,memory
    ext: 'html',
    writeBody: false,
    varControls:["[[","]]"]//解决和vue的{{}}冲突
  }));
//记录业务和逻辑的错误，所有的http都要记日志
  log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'logs/cheese.log' } },//cheese是日志的名字
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  });
  const logger = log4js.getLogger('cheese');

//注入我们的路由
errorHandle.error(app,logger);
require("./controllers")(app);
app.listen(config.port,()=>{
    console.log("项目以成功启动，端口3000 ");
});