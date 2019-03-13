fetch("/test").then((res)=>{
    return res.json();
}).then((res)=>{
    console.log("后台数据",res);
    //document.getElementById("app").innerHTML=res.data;
});