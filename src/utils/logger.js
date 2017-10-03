import log4js from 'log4js';
import path from 'path';
log4js.configure({
    appenders: {// 输出源 eg：log4js配置是个日志输出工厂，而真正干输出活的是员工。appenders里的每个对象则是员工
        console: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: path.join(__dirname, '../../log/file/log.log')
        },
        date: {
            type: 'dateFile',
            filename: path.join(__dirname, '../../log/date/log.log'),
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: true
        }
    },
    categories: {
        file: {
            appenders: ['file'],
            level: 'error'
        },
        date: {
            appenders: ['date'],
            level: 'error'
        },
        default: {
            appenders: ['console'],
            level: 'debug' // trace、debug、info、warn、error、fatal
        }
    }
});
export default log4js;
