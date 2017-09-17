import Sequelize from 'sequelize';
import config from 'config';
const { DB: { sequelize }, System: SystemConfig } = config;
export default new Sequelize(sequelize.database, sequelize.username, sequelize.password, {
    host: sequelize.host,
    dialect: SystemConfig.db_type,
    dialectOptions: { // MySQL > 5.5，其它数据库删除此项
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
});

