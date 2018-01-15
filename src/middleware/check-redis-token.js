import redis from 'utils/db/redisdb';
import { getTokenKey, getTokenFromCtx, getUserIdFromCtx } from 'utils';

async function checkToken(ctx) {
    // 获取请求中的token
    const token = getTokenFromCtx(ctx);
    const userId = getUserIdFromCtx(ctx);
    const { accessTokenKey, refreshTokenKey } = getTokenKey(userId);
    // 若是刷新token
    if (ctx.method === 'GET' && ctx.url === '/v1/auth/token') {
        let refreshToken;
        // 获取内存中的refreshtoken
        await redis.get(refreshTokenKey).then(result => {
            refreshToken = result;
        });
        return refreshToken === token;
    } else {
        let accessToken;
        // 获取内存中的accessToken
        await redis.get(accessTokenKey).then(result => {
            accessToken = result;
        });
        return accessToken === token;
    }
}

export default async(ctx, next) => {
    const isTokenExist = await checkToken(ctx);
    if (!isTokenExist) {
        ctx.throw(401, 'Invalid token');
    }
    await next();
};
