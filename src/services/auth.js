import { UserDao } from 'models/user';
import { resJson, getTokenKey } from 'utils/res-utils';
import jwt from 'jsonwebtoken';
import redis from 'utils/db/redisdb';
import config from 'config';

const { System: { expire_access_token, expire_refresh_token, publicKey } } = config;
// 创建token
const createTonken = (payload, expiresIn) => {
    const token = jwt.sign(payload, publicKey, {
        expiresIn // 过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间+设置的值
    });
    return token;
};
// 保存token在redis
const saveToken = (accessToken, refreshToken, key) => {
    const { accessTokenKey, refreshTokenKey } = getTokenKey(key);
    redis.set(accessTokenKey, accessToken);
    redis.expire(accessTokenKey, expire_access_token);
    redis.set(refreshTokenKey, refreshToken);
    redis.expire(refreshTokenKey, expire_refresh_token);
};
// 登录
const login = async(username, password) => {
    const user = await UserDao.findByUsername(username);
    let res;
    if (!user) {
        res = resJson({}, 202001);
    } else {
        const { password: dbPassword, id: userId } = user;
        if (password === dbPassword) {
            const payload = { userId };
            const accessToken = createTonken(payload, expire_access_token);
            const refreshToken = createTonken(payload, expire_refresh_token);
            saveToken(accessToken, refreshToken, userId);
            res = resJson({
                access_token: accessToken,
                refresh_token: refreshToken
            });
        } else {
            res = resJson({
            }, 201005);
        }
    }
    return res;
};
// 更新token
const refreshToken = userId => {
    const payload = { userId };
    const accessToken = createTonken(payload, expire_access_token);
    const refreshToken = createTonken(payload, expire_refresh_token);
    saveToken(accessToken, refreshToken, userId);
    const res = resJson({
        access_token: accessToken,
        refresh_token: refreshToken
    });
    return res;
};
export default { login, refreshToken };
