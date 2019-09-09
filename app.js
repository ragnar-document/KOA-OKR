const Koa = require('koa');
const app = new Koa();
const router = require('./routes')
const bodyParser = require('koa-bodyparser');
const response = require('./middlewares/response');//全局错误捕获

app
    .use(bodyParser())
    .use(response)
    .use(router.routes())
    .listen(3000);
console.log('ok 3000')