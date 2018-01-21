import config from 'config';
import redis from 'utils/db/redisdb';
import { getTokenKey, getTokenFromCtx, getUserIdFromCtx, isMatchAPI } from 'utils/res-utils';

const { API: { publicAPI, refreshTokenAPI } } = config;
async function checkToken(ctx) {
    // 获取请求中的token
    const token = getTokenFromCtx(ctx);
    const userId = getUserIdFromCtx(ctx);
    const { accessTokenKey, refreshTokenKey } = getTokenKey(userId);
    // 若是刷新token
    if (isMatchAPI(refreshTokenAPI, ctx)) {
        let refreshToken;
        // 获取内存中的refreshtoken
        await redis.get(refreshTokenKey).then(result => {
            refreshToken = result;
        });
        return refreshToken === token;
    } else if (isMatchAPI(publicAPI, ctx)) {
        // 若是开放api
        return true;
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
