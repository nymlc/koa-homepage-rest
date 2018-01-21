import userService from 'services/user';
import { QueryParams } from 'utils/api/res-query';
const register = async ctx => {
    // 拿到账号和密码
    const { username, password } = ctx.request.body;
    const res = await userService.addUser(username, password);
    return res;
};
const getAllUsers = async ctx => {
    const { query } = ctx;
    const queryParams = new QueryParams();
    const option = queryParams.parse(query);
    const res = await userService.getAllUsers(option);
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
            ctx.throw(404, 'Not Found!');
    }
};
export default { get, post };
