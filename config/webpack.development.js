const CopyPlugin = require("copy-webpack-plugin");
const { join } = require("path");
module.exports = {
        plugins: [
                new CopyPlugin([
                        {
                                from: join(__dirname, "../", "/src/web/views/common/layout.html"),
                                to: '../views/common/layout.html'
                        },
                        { 
                                from: join(__dirname, "../", "/src/web/components"),
                                to: '../views/components'
                        },
                ],{
                        copyUnmodified:true,//配合watch
                        ignore:["*.js","*.css","..DS_Stroe"]
                }),
        ]
}