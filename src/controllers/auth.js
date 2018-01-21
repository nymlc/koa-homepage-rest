import jwt from 'jsonwebtoken';
import config from 'config';
// 用于密码加密
// import sha1 from 'sha1';
import authService from 'services/auth';
import { getUserIdFromCtx } from 'utils/res-utils';
const { System: { publicKey } } = config;

/**
 * 检查授权是否合法
 */
const checkAuth = ctx => {
    const token = ctx.request.header.authorization;
    try {
        const decoded = jwt.verify(token.substr(7), publicKey);
        if (decoded.userInfo) {
            return {
                status: 1,
                result: decoded.userInfo
            };
        } else {
            return {
                status: 403,
                result: {
                    errInfo: '没有授权'
                }
            };
        }
    } catch (err) {
        return {
            status: 503,
            result: {
                errInfo: '解密错误'
            }
        };
    }
};
const login = async ctx => {
    // 拿到账号和密码
    const { username, password } = ctx.request.body;
    const res = await authService.login(username, password);
    return res;
};
const refreshToken = async ctx => {
    const userId = getUserIdFromCtx(ctx);
    const res = await authService.refreshToken(userId);
    return res;
};
const post = ctx => {
    switch (ctx.params.action) {
        case 'check':
            return checkAuth(ctx).then(result => { ctx.body = result; });
        case 'session':
            return login(ctx).then(res => { ctx.body = res; });
        default:
            ctx.throw(404, 'Not Found!');
    }
};
const get = ctx => {
    switch (ctx.params.action) {
        case 'token':
            return refreshToken(ctx).then(result => { ctx.body = result; });
        default:
            ctx.throw(404, 'Not Found!');
    }
};
export default { get, post };
