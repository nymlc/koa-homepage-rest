import log4js from 'utils/logger';
const logger = log4js.getLogger('console');
export default async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    logger.info(`${ctx.method} ${decodeURI(ctx.url)} - ${ms}ms`);
};
