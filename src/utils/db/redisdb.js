import Redis from 'ioredis';
import config from 'config';
const { DB: { redis } } = config;
const client = new Redis(redis.redis);

client.on('error', err => {
    console.log('Redis数据库连接失败！', err);
});

client.on('ready', () => {
    console.log('Redis数据库准备成功！');
});
client.on('connect', () => {
    console.log('Redis数据库连接成功！');
});
export default client;
