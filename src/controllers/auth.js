import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
// 用于密码加密
// import sha1 from 'sha1';
import authService from 'services/auth';
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'));

// 用户登录的时候返回token
// let token = jwt.sign({
//   userInfo: userInfo // 你要保存到token的数据
// }, publicKey, { expiresIn: '7d' })

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
    // 拿到token
    const token = ctx.header.authorization.split(' ')[1];
    const decoded = jwt.decode(token, 'ln');
    const { userId } = decoded;
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
            // return checkAuth(ctx).then(result => { ctx.body = result; });
            ctx.throw(404, 'Not Found!');
    }
};
const get = ctx => {
    switch (ctx.params.action) {
        case 'token':
            return refreshToken(ctx).then(result => { ctx.body = result; });
        default:
            // return checkAuth(ctx).then(result => { ctx.body = result; });
            ctx.throw(404, 'Not Found!');
    }
};
export default { get, post };
