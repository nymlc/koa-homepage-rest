import multer from 'koa-multer';
import config from 'config';
import { getUUID } from 'utils';
import { resJson } from 'utils/api/res-utils';
const { System: { uploadsPath: { absolutePath, relativePath } } } = config;
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, absolutePath);
    },
    filename(req, file, cb) {
        const { originalname } = file;
        const result = originalname.match(/\.\w*?$/);
        const suffix = result ? result[0] : '';
        const filename = `${getUUID()}${suffix}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

const middleware = upload.single('file');

const callback = async(ctx, next) => {
    const { host, req: { file: { filename } } } = ctx;
    console.log(ctx);
    const fileUrl = `${host}${relativePath}${filename}`;
    ctx.body = resJson({ filename: fileUrl });
};

export default {
    middleware, callback
};
