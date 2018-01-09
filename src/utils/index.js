import resCode from './res-code';

const resJson = (data, code = 0, msg = 'done') => {
    //     {
    //     data : { // 请求数据，对象或数组均可
    //         user_id: 123,
    //         user_name: "tutuge",
    //         user_avatar_url: "http://tutuge.me/avatar.jpg"
    //         ...
    //     },
    //     msg : "done", // 请求状态描述，调试用
    //     code: 1001, // 业务自定义状态码
    //     extra : { // 全局附加数据，字段、内容不定
    //         type: 1,
    //         desc: "签到成功！"
    //     }
    // }
    if (code !== 0) {
        msg = resCode[code];
    }
    const res = {
        code,
        msg,
        data
    };
    return res;
};

const getTokenKey = userId => {
    const accessTokenKey = `${userId}a`;
    const refreshTokenKey = `${userId}r`;
    return {
        accessTokenKey, refreshTokenKey
    };
};

const getUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
});

export {
    resJson, getTokenKey, getUUID
};
