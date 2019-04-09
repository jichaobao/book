const {
    join
} = require("path");//lodash
const _ =require("lodash");
let config={
     "viewDir":join(__dirname,"..","views"),
     "staticDir":join(__dirname,"..","assets")
}
if(process.env.NODE_ENV=="development"){
    const localConfig={
        port:3000,
        cacheMode:false,
        baseURL:"http://localhost/libraryproject/web/index.php?r="
    }
    config = _.extend(config,localConfig);
}
if(process.env.NODE_ENV=="production"){
    const prodConfig={
        port:8081,
        cacheMode:"memory"
    }
    config = _.extend(config,prodConfig);
}
module.exports = config;

//用Map和Set也可以