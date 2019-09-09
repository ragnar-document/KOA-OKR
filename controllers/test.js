const testController = {
    test: async (ctx, next)=>{
        let user_id = ctx.state.user_id;
        ctx.state.code = 200;
        ctx.state.data = {id:user_id}
    }
}
module.exports = testController