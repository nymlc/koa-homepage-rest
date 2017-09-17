const Get = ctx => {
    ctx.body = {
        result: 'get',
        name: ctx.params.name,
        para: ctx.query
    };
};

const Post = async ctx => {
    ctx.body = {
        result: 'post',
        name: ctx.params.name,
        para: ctx.request.body
    };
};

const Put = ctx => {
    ctx.body = {
        result: 'put',
        name: ctx.params.name,
        para: ctx.request.body
    };
};

const Delect = ctx => {
    ctx.body = {
        result: 'delect',
        name: ctx.params.name,
        para: ctx.request.body
    };
};
export default { Get, Post, Put, Delect };
