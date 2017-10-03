import mongoose from 'mongoose';

// 声明schema
const UserSchema = mongoose.Schema({
    username: Number,
    password: String
});
// 根据schema生成model
const User = mongoose.model('User', UserSchema);

export default User;