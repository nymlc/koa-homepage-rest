import compose from 'koa-compose';
import KoaBody from 'koa-body';
import KoaStatic2 from 'koa-static2';
import config from 'config';
import path from 'path';
import MainRoutes from 'routes/main-routes';
import header from 'middleware/set-header';
import logger from 'middleware/logger';
import checkRedisToken from 'middleware/check-redis-token';
import errorCatch from 'middleware/error-catch';
import jwt from 'koa-jwt';

const { System: SystemConfig } = config;
const env = process.env.NODE_ENV || 'development'; // Current mode
const koaStatic = KoaStatic2('assets', path.resolve(__dirname, '../assets')); // Static resource
const koaJwt = jwt({ secret: SystemConfig.publicKey })
    .unless({
        path: [/^\/public|\/v1\/auth\/session|\/v1\/users|\/v1\/assets/]
    });
const body = KoaBody({
    multipart: true,
    strict: false,
    formidable: {
        uploadDir: path.join(__dirname, '../../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
});
const middlewareArr = [errorCatch, koaStatic, koaJwt, checkRedisToken, body,
    MainRoutes.routes(), MainRoutes.allowedMethods(), header];
if (env === 'development') {
    // logger
    middlewareArr.unshift(logger);
}

const middlewares = compose(middlewareArr);

export default middlewares;

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
