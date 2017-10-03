import log4js from 'utils/logger';
const logger = log4js.getLogger('date');
export default async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (!err) {
            return ctx.error({ msg: new Error('未知错误!') });
        }
        // 自抛异常
        if (typeof err === 'string') {
            return ctx.error({ msg: new Error(err) });
        }
        switch (err.status) {
            case 401:
                ctx.status = 200;
                ctx.body = {
                    status: 401,
                    result: {
                        err: 'Authentication Error',
                        errInfo: 'Protected resource, use Authorization header to get access.'
                    }
                };
                break;
            case 404:
                ctx.body = '没有找到内容 - 404';
                break;
            case 500:
                ctx.body = '服务器错误 - 500';
                logger.error(JSON.stringify(err));
                break;
            default:
                ctx.body = {
                    code: -1,
                    msg: '未捕获异常!'
                };
                logger.error(JSON.stringify(err));
                break;
        }
    }
};

// const callback = ctx.query.callback;
// err.status = err.statusCode || err.status || 500;
// let errBody = {
//     code: -1,
//     data: err.message
// };
// if (callback) errBody = callback + '(' + errBody + ')';
// ctx.body = errBody;
