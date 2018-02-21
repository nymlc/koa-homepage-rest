import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String,
        default: ''
    }, // 标签
    created_at: {
        type: Date,
        default: Date.now
    }
});
const Tag = mongoose.model('Tag', TagSchema);
export default Tag;
