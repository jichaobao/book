//process.argv所有参数
const argv = require("yargs-parser")(process.argv.slice(2));
const _model = argv.mode || "development";
const  _mergeConfig=require(`./config/webpack.${_model}.js`);
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterWebpackPlugin =require("./config/HtmlAfterWebpackPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {join}  = require("path");
//在指定文件夹内查到对应的文件
var glob = require("glob");
const files = glob.sync("./src/web/views/**/*.entry.js");

const _entry = {};
const _plugins=[];
for(let item of files){
        if(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item)==true){
                console.log("文件名",RegExp.$1);
                const entrykey = RegExp.$1;
                _entry[entrykey]=item;
                const [dist,template] = entrykey.split("-");
                _plugins.push(new HtmlWebpackPlugin({  // Also generate a test.html
                        filename: `../views/${dist}/pages/${template}.html`,
                        template: `src/web/views/${dist}/pages/${template}.html`,
                        chunks:[entrykey],//非常重要，用来判断往页面中插入哪个js和css
                        inject:false
                }));
        }
}

let webpackconfig = {
        entry:_entry,
        module: {
                rules: [
                  {
                    test: /\.css$/,
                    use: [
                      {
                        loader: MiniCssExtractPlugin.loader,
                      },
                      "css-loader"
                    ]
                  }
                ]
         },
        // module: {
        //         rules: [
        //           {
        //             test: /\.css$/,
        //             use: ['style-loader', 'css-loader'],
        //           },
        //         ],
        // },
        output:{
                path:join(__dirname,"./dist/assets"),
                publicPath:"/",
                filename:"scripts/[name].bundle.js"
        },
        plugins:[
                new MiniCssExtractPlugin({
                        // Options similar to the same options in webpackOptions.output
                        // both options are optional
                        filename: "styles/[name].css",
                        chunkFilename: "styles/[id].css"
                 }),
                //new HtmlAfterWebpackPlugin(),//在webpack什么都没干的时候这个插件先执行
                ..._plugins,
                new HtmlAfterWebpackPlugin()
        ]
}
module.exports = merge(webpackconfig,_mergeConfig);