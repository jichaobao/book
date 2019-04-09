"use strict";

const Index = require("../models/index");

const {
  URLSearchParams
} = require("url");

class IndexController {
  constructor() {}

  actionIndex() {
    return async (ctx, next) => {
      //ctx.body = "hello";
      //SSR直接服务端渲染，灌到前台，crs是向后端发ajax，然后用js在本地操作dom
      const index = new Index();
      const result = await index.getData();
      ctx.body = await ctx.render("books/pages/list", {
        data: result.data
      });
    };
  }

  actionAdd() {
    return async (ctx, next) => {
      ctx.body = await ctx.render("books/pages/add");
    };
  }

  actionSave() {
    return async (ctx, next) => {
      const index = new Index(); //构建表单的形式，formdata

      const paramas = new URLSearchParams();
      paramas.append("Books[name]", "测试");
      paramas.append("Books[author]", "测试111");
      const result = await index.saveData({
        paramas
      });
      ctx.body = result;
    };
  }

}

module.exports = IndexController;