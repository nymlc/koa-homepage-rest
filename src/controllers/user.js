import userService from 'services/user';
import { UserModelName } from 'models/user';
import { QueryParams } from 'utils/api/res-query';
const register = async ctx => {
    // 拿到账号和密码
    const { username, password } = ctx.request.body;
    const res = await userService.addUser(username, password);
    return res;
};
const getAllUsers = async ctx => {
    const { querystring } = ctx;
    let res;
    const option = QueryParams.parseQueryString(querystring, UserModelName);
    if (typeof option === 'boolean') {
        res = '无效参数';
    } else {
        res = await userService.getUsers(option);
    }
    return res;
};
const post = ctx => {
    switch (ctx.params.action) {
        case 'users':
            return register(ctx).then(res => { ctx.body = res; });
        default:
            // return register(ctx).then(res => { ctx.body = res; });
            ctx.throw(404, 'Not Found!');
    }
};
const get = ctx => {
    switch (ctx.params.action) {
        case 'users':
            return getAllUsers(ctx).then(res => { ctx.body = res; });
        default:
            // return register(ctx).then(res => { ctx.body = res; });
            // ctx.throw(404, 'Not Found!');
            return getAllUsers(ctx).then(res => { ctx.body = res; });
    }
};
export default { get, post };
