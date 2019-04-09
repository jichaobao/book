/**
 * 
 * 
 */
const errorHandler={
    error(app,logger){
        app.use(async (ctx,next) => {
            try {
                await next();
            } catch (error) {
                ctx.status=500;
                logger.error(error);
                ctx.body="😿,服务器500错误" ;
            }    
        });
        app.use(async (ctx,next) => {
            await next();//先让你走，等你回来
            if(404 != ctx.status){
                return;
            }
            //有时候不用404，怕百度降权
            ctx.status=200;
            ctx.body='<iframe src="https://api.isoyu.com/gy/" frameborder="0" scrolling="no" width="300" height="300"></iframe>';
        });
    }
    
}
module.exports=errorHandler;