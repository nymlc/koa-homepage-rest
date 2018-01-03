import User from 'models/user';
import { resJson, getTokenKey } from 'utils/utils';
import jwt from 'jsonwebtoken';
import redis from 'utils/db/redisdb';
import config from 'config';

const { System: { expire_access_token, expire_refresh_token, publicKey } } = config;
// 根据用户名查找用户
const findUserByUn = async username => {
    const user = await User.findOne({ username });
    return user;
};
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
    const user = await findUserByUn(username);
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
            // await user.save();
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

// 注册
const register = async(username, password) => {
    const newUser = new User({
        username,
        password
    });
    // 将objectid转换为用户创建时间(可以不用)
    // user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    const user = await findUserByUn(username);
    let res;
    if (user) {
        res = resJson({}, 202002);
    } else {
        await new Promise((resolve, reject) => {
            newUser.save(err => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        res = resJson({});
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
export default { login, register, refreshToken };
