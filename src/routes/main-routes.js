import KoaRouter from 'koa-router';
import auth from 'controllers/auth';
import upload from 'controllers/upload';
import api from 'controllers/api';
import user from 'controllers/user';

const router = new KoaRouter();

router
    .get('/public/get', (ctx, next) => {
        ctx.body = '禁止访问！';
    }) // 以/public开头则不用经过权限认证
    .all('/upload', upload)
    .get('/api/:name', api.Get)
    .post('/api/:name', api.Post)
    .put('/api/:name', api.Put)
    .del('/api/:name', api.Delect)
    .get('/v1/auth/:action', auth.get)
    .post('/v1/auth/:action', auth.post)
    .get('/v1/auth/:action', auth.get)
    .post('/v1/:action', user.post);

export default router;
