const Project = require('../models/project');
const Target = require('../models/target');
const { formatTime } = require('../utils/autoTime');
const projectController = {
    insert: async function (ctx, next) {
        let params = ctx.request.body.params;
        await Project.insert(params)
        ctx.state.code = 200;
    },
    all: async function (ctx, next) {
        let id = ctx.params.id;
        let todolist = await Project.all(id).where({status:1});
        todolist.forEach(data => {
            if (data.start_time == null) {
                data.start_time = data.start_time
            } else {
                data.start_time = formatTime(data.start_time)
            }
        })

        ctx.state.code = 200;
        ctx.state.data.todolist = {todolist:todolist}
    },
    singleItem: async function (ctx, next) {
        let id = ctx.params.id;
        let todolistItem = await Project.single(id);
        ctx.state.code = 200;
        ctx.state.data.todolistItem = { todolistItem: todolistItem }
    },
    delItem: async function (ctx, next) {
        let id = ctx.params.id;
        console.log(id,123)
        await Project.del(id)
        ctx.state.code = 200;
        ctx.state.data = '删除成功'
    },
    homeDelItem: async function (ctx, next) {
        let id = ctx.params.id;
        let project_id = ctx.params.id;
        let targetData = await Target.where({ project_id });
        targetData.forEach(async data => {
            await Target.del(data.id)
        })
        await Project.del(id)
        ctx.state.code = 200;
        ctx.state.data = '删除成功'
    },
    details: async function (ctx, next) {
        let user_id = ctx.query.user_id;
        let project_id = ctx.params.id;

        let projectDetails = await Project.where({ user_id, 'id': project_id });
        projectDetails.forEach(data => {
            if (data.start_time == null || data.end_time == null) {
                data.start_time = data.start_time
                data.end_time = data.end_time
            } else {     
                data.start_time = formatTime(data.start_time),
                data.end_time = formatTime(data.end_time)
            }
        })
        let projectTaget_id = projectDetails[0].id;
        let projectTaget = await Target.where({ user_id, 'project_id': projectTaget_id });
        projectTaget.forEach(data => {
            data.create_time = formatTime(data.create_time)
        })
        ctx.state.code = 200;
        ctx.state.data = { projectDetails, projectTaget}

    },
    updata: async function (ctx, next) {
        let id = ctx.params.id;
        let params = ctx.request.body.params.params;
        let over_time = new Date();
        params.over_time = over_time;
        console.log(ctx.request.body.params)
        await Project.updata(id, params).then(res => {
            console.log(res)
        }).catch(err=>{
            console.log(err)
        });
        ctx.state.code = 200;
        ctx.state.data = '更改成功'
    }
}
module.exports = projectController;