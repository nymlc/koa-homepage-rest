import redis from 'utils/db/redisdb';
import jwt from 'jsonwebtoken';
import config from 'config';

const { System: { publicKey } } = config;
async function checkToken(ctx) {
    if (ctx.method === 'GET' && ctx.url === '/v1/auth/token') {
        // 获取请求中的token
        const token = ctx.header.authorization.split(' ')[1];
        const decoded = jwt.decode(token, publicKey);
        const { userId } = decoded;
        let refreshToken;
        // 获取内存中的refreshtoken
        await redis.get(userId + 'r').then(result => {
            refreshToken = result;
        });
        return refreshToken === token;
    } else {
        return true;
    }
}

module.exports = function() {
    return async(ctx, next) => {
        const isTokenExist = await checkToken(ctx);
        if (!isTokenExist) {
            ctx.throw(401, 'Invalid token');
        }
        return next();
    };
};
