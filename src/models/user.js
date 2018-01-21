import mongoose from 'mongoose';
import Dao from 'utils/action-dao';

// 声明schema
const UserSchema = mongoose.Schema({
    username: String,
    password: String
});
// 根据schema生成model
const User = mongoose.model('User', UserSchema);
const UserDao = Dao(User);
UserDao.findByUsername = async username => {
    const user = await User.findOne({ username });
    return user;
};
export { User, UserDao };
