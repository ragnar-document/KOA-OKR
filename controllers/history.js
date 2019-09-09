const Project = require('../models/project');
const { formatTime } = require('../utils/autoTime');

const historyController = {
    all: async function (ctx, next) {
        let id = ctx.params.id;
        console.log(id)
        let todolist = await Project.all(id).where({ status: 2 });
        todolist.forEach(data => {
            if (data.start_time == null) {
                data.start_time = data.start_time;
                data.over_time = formatTime(data.over_time)
            } else {
                data.start_time = formatTime(data.start_time);
                data.over_time = formatTime(data.over_time)
            }
        })
        console.log(todolist)
        ctx.state.code = 200;
        ctx.state.data.todolist = { todolist: todolist }
    }
}

module.exports = historyController;