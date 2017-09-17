import mongoose from 'mongoose';
import config from 'config';
const { DB: { mongo } } = config;
// 连接数据库.
mongoose.connect(mongo.uri, mongo.options);
// mongoose promise 风格 [mongoose.Promise = require('bluebird')]
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', () => {
    console.log('MongoDB数据库连接出错！');
});
db.on('open', () => {
    console.log('MongoDB数据库连接成功！');
});
