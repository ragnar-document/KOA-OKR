const Target = require('../models/target');
const { formatTime } = require('../utils/autoTime');

const relevanceController = {
    insert: async function (ctx, next) {
        let params = ctx.request.body.params;
        await Target.insert(params)
        ctx.state.code = 200;
        ctx.state.data = '创建成功'
    },
    all: async function (ctx, next) {
        let project_id = ctx.query.project_id;
        let user_id = ctx.params.id;

        let targetData = await Target.where({ user_id, project_id })
        targetData.forEach(data => {
            data.create_time = formatTime(data.create_time)
        })
        ctx.state.code = 200;
        ctx.state.data = {targetData}
    },
    updata: async function (ctx, next) {
        let status = ctx.request.body.status;
        let params = [];
        if (status == 1) params.status = 2;
        let id = ctx.params.id;
        await Target.updata(id,params)
        ctx.state.code = 200;
        ctx.state.data = '更改成功'
    },
    delItem: async function (ctx, next) {
        let id = ctx.params.id;
        await Target.del(id)
        ctx.state.code = 200;
        ctx.state.data = '删除成功'
    }

}

module.exports = relevanceController;