const debug = require('debug')('koa-app')

module.exports = async function (ctx, next) {
    try {
        ctx.state.code = 0
        ctx.state.data = {}
        await next()

        //如果直接写入body则不出来
        ctx.body = ctx.body ? ctx.body : {
            code: ctx.state.code,
            data:ctx.state.data
        }
    } catch (e) {
        debug('Catch Error: %o', e)
        ctx.status = 200

        // 输出详细的错误信息
        ctx.body = {
            code: -1,
            error: e && e.message ? e.message : e.toString()
        }
    }
}