import path from 'path';
import fs from 'fs';

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'));
// 系统配置
const config = {
    System: {
        api_server_type: 'http://', // api服务器协议类型,包含"http://"或"https://"
        api_server_host: 'localhost', // api服务器暴露的域名地址,请勿添加"http://"
        api_server_port: '3000', // api服务器监听的端口号
        http_server_type: 'http://', // http服务器协议类型,包含"http://"或"https://"
        http_server_host: 'www.nymlc.com', // http服务器地址,请勿添加"http://" （即前端调用使用的服务器地址，如果是APP请设置为 * ）
        http_server_port: '8080', // http服务器端口号
        System_country: 'zh-cn', // 所在国家的国家代码
        expire_access_token: 60,
        expire_refresh_token: 60 * 60,
        publicKey
    },
    DB: {
        sequelize: {
            host: 'localhost', // 服务器地址
            port: 3306, // 数据库端口号
            username: 'admin', // 数据库用户名
            password: 'admin888', // 数据库密码
            database: 'development', // 数据库名称
            prefix: 'api_' // 默认"api_"
        },
        mongo: {
            uri: 'mongodb://127.0.0.1/ln',
            options: {
                useMongoClient: true,
                user: '',
                pass: ''
            }
        },
        // redis 配置
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: ''
        }
    }
};

export default config;
