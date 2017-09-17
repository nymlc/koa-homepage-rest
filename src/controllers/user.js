import userService from 'services/user';
const register = async ctx => {
    // 拿到账号和密码
    const { username, password } = ctx.request.body;
    const res = await userService.addUser(username, password);
    return res;
};

const post = ctx => {
    switch (ctx.params.action) {
        case 'users':
            return register(ctx).then(res => { ctx.body = res; });
        default:
            return register(ctx).then(res => { ctx.body = res; });
    }
};
export default { post };
