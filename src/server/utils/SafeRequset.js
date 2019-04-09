const fetch = require("node-fetch");
const config = require("../config");

class SafeRequest{
    constructor(url){
        this.url=url;
        this.baseURL=config.baseURL;
    }
    fetch(options){
        let  ydfetch = fetch(this.baseURL+this.url);
        if(options){
            ydfetch = fetch(this.baseURL+this.url,{
                method:options.method,
                body:options.params
            });
        }
        return new Promise((resolve,reject)=>{
            let result ={
                code:0,
                message:"",
                data:[]
            }
            ydfetch.then(res=>res.json())
            .then(json=>{
                result.data = json;
                resolve(result);
            }).catch(error=>{
                result.code= 1;
                result.message ="node-fecth和后端通信异常";
                reject(result);
            });
        });
    }
}
module.exports=SafeRequest;