const authCode = require('../utils/auth');
const Weixin = require('../models/weixin');
const User = require('../models/user');
const { formatTime } = require('../utils/autoTime');
const userController = {
    login: async function (ctx, next) {
        let code = ctx.request.body.code;
        if (!code) {
            ctx.state.data = { message: '缺少code参数' }
            return
        }

        let weixinRequest = await Weixin.code2Session(code);
        let weixinData = weixinRequest.data;
        let open_id = weixinData.openid;
        let users = await User.select({ open_id });
        let user = users[0];
        let user_id;
        if (!user) {
            let userid = await User.insert({ open_id });
            console.log(userid[0].id)
            user_id = userid[0].id;
        } else {
            user_id = user.id;            
        }
        let dateTime = formatTime(new Date());
        let auth_Code = 'ragnar' + '\t' + dateTime + '\t' + user_id;
        let token = authCode(auth_Code, 'ENCODE');
        ctx.state.code = 200;
        ctx.state.data = { token: token,user_id:user_id };
    }
}
module.exports = userController