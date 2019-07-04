class TestController{
    constructor(){}
    actionIndex(){
        return  async(ctx,next) => {
            ctx.body = {
                data:"TestController"
            };
        }
    }
}
module.exports = TestController;