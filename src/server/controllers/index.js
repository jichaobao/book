const router = require('koa-simple-router');
//导入一个对象，也可以导入一个类，用类更方便，比如私有变量和注入
const IndexController = require("./IndexController");
const indexController = new IndexController();
const TestController = require("./TestController");
const testController = new TestController();
//路由集中处理 的地方
module.exports = (app) =>{
    //代码从koa-simple-router github示例中拷贝
    app.use(router(_ => {
        // _.get('/', (ctx, next) => {
        //     ctx.body = 'hello'
        //   })
        _.get('/', indexController.actionIndex());
        _.get('/index.html', indexController.actionIndex());
        _.get('/add', indexController.actionAdd());
        _.get('/save', indexController.actionSave());
        _.get('/test', testController.actionIndex());
    }));
} 