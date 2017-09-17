import User from 'models/user';
import { resJson } from 'utils/utils';

// 根据用户名查找用户
const findUserByUn = async username => {
    const user = await User.findOne({ username });
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

    const user = await findUserByUn(username);
    let res;
    if (user) {
        res = resJson({}, 202002);
    } else {
        await new Promise((resolve, reject) => {
            newUser.save(err => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        res = resJson({});
    }
    return res;
};
export default { addUser };
