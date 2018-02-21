import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        default: ''
    }, // 类别
    created_at: {
        type: Date,
        default: Date.now
    }
});
const Category = mongoose.model('Category', CategorySchema);
export default Category;
