import 'module-alias/register';
import Koa2 from 'koa';
import KoaBody from 'koa-body';
import KoaStatic from 'koa-static2';
import config from 'config';
import path from 'path';
import MainRoutes from 'routes/main-routes';
import ErrorRoutes from 'routes/error-routes';
import ErrorRoutesCatch from 'middleware/error-routes-catch';
import checkRedisToken from 'middleware/check-redis-token';
import jwt from 'koa-jwt';
import 'utils/db/mongodb';

const app = new Koa2();

const { System: SystemConfig } = config;
const env = process.env.NODE_ENV || 'development'; // Current mode

app.use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
        ctx.set('Access-Control-Allow-Origin', '*');
    } else {
        ctx.set('Access-Control-Allow-Origin', SystemConfig.http_server_host);
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', true); // 允许带上 cookie
    return next();
}).use(ErrorRoutesCatch())
    .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
    .use(jwt({ secret: SystemConfig.publicKey }).unless({ path: [/^\/public|\/v1\/auth\/session|\/v1\/users|\/v1\/assets/] }))
    .use(checkRedisToken())
    .use(KoaBody({
        multipart: true,
        strict: false,
        formidable: {
            uploadDir: path.join(__dirname, '../assets/uploads/tmp')
        },
        jsonLimit: '10mb',
        formLimit: '10mb',
        textLimit: '10mb'
    })) // Processing request
    .use(MainRoutes.routes())
    .use(MainRoutes.allowedMethods())
    .use(ErrorRoutes());

if (env === 'development') { // logger
    //     const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
    //     const devConfig = require('../build/webpack.config');
    //     const compile = require('webpack')(devConfig);
    //     app.use(devMiddleware(compile, {
    //         // display no info to console (only warnings and errors) 
    //         noInfo: false,
    //         // display nothing to the console 
    //         quiet: false,
    //         // switch into lazy mode 
    //         // that means no watching, but recompilation on every request 
    //         lazy: false,
    //         // watch options (only lazy: false) 
    //         watchOptions: {
    //             aggregateTimeout: 300,
    //             poll: true
    //         },
    //         // public path to bind the middleware to 
    //         // use the same as in webpack 
    //         publicPath: '/',
    //         // custom headers 
    //         // headers: { "X-Custom-Header": "yes" },
    //         // options for formating the statistics 
    //         stats: {
    //             colors: true
    //         }
    //     }));
    //     app.use(hotMiddleware(compile, {
    //         log: console.log,
    //         // path: '/__webpack_hmr', 
    //         heartbeat: 10 * 1000
    //     }));
    app.use((ctx, next) => {
        const start = new Date();
        return next().then(() => {
            const ms = new Date() - start;
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
        });
    });
}

app.listen(SystemConfig.api_server_port);

console.log('Now start api server on port ' + SystemConfig.api_server_port + '...');

export default app;
