import User from 'models/user';
import { resJson } from 'utils';

// 根据用户名查找用户
const findUser = async option => {
    const user = await User.findOne(option);
    return user;
};
// 添加用户
const addUser = async(username, password) => {
    const newUser = new User({
        username,
        password
    });
    // 将objectid转换为用户创建时间(可以不用)
    // user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

    const user = await findUser({ username });
    let res;
    if (user) {
        res = resJson({}, 202002);
    } else {
        await newUser.save();
        res = resJson({});
    }
    return res;
};
export default { addUser, findUser };
