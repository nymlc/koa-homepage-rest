import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/**
    标题
    标题颜色（最后一个）
    作者
    创建时间
    更新时间
    封面
    浏览量
    点赞量
    内容
*/
const ArticleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    titleColor: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    views: { // 浏览数量
        type: Number,
        default: 0
    },
    praises: { // 点赞数量
        num: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    cover: { // 文章封面图
        type: String,
        default: null
    },
    categorys: [{ // 文章类别
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    tags: [{ // 标签
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});
const Article = mongoose.model('Article', ArticleSchema);
export default Article;
