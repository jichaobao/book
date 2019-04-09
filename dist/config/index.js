'use strict';

const {
    join
} = require("path");//lodash
const _ =require("lodash");
let config={
     "viewDir":join(__dirname,"..","views"),
     "staticDir":join(__dirname,"..","assets")
};
{
    const prodConfig={
        port:8081,
        cacheMode:"memory"
    };
    config = _.extend(config,prodConfig);
}
module.exports = config;

//用Map和Set也可以
