import config from 'config';
const { System: SystemConfig } = config;

export default async(ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
        ctx.set('Access-Control-Allow-Origin', '*');
    } else {
        ctx.set('Access-Control-Allow-Origin', SystemConfig.http_server_host);
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', true); // 允许带上 cookie
    await next();
};
