import redis from 'utils/db/redisdb';
import jwt from 'jsonwebtoken';
import config from 'config';
import { getTokenKey } from 'utils';

const { System: { publicKey } } = config;
async function checkToken(ctx) {
    if (ctx.method === 'GET' && ctx.url === '/v1/auth/token') {
        // 获取请求中的token
        const token = ctx.header.authorization.split(' ')[1];
        const decoded = jwt.decode(token, publicKey);
        const { userId } = decoded;
        let refreshToken;
        const { refreshTokenKey } = getTokenKey(userId);
        // 获取内存中的refreshtoken
        await redis.get(refreshTokenKey).then(result => {
            refreshToken = result;
        });
        return refreshToken === token;
    } else {
        return true;
    }
}

export default async(ctx, next) => {
    const isTokenExist = await checkToken(ctx);
    if (!isTokenExist) {
        ctx.throw(401, 'Invalid token');
    }
    await next();
};
