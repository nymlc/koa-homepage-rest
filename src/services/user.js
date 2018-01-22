import { User, UserDao } from 'models/user';
import { resJson } from 'utils/api/res-utils';

// 添加用户
const addUser = async(username, password) => {
    const newUser = new User({
        username,
        password
    });

    const user = await UserDao.findByUsername(username);
    let res;
    if (user) {
        res = resJson({}, 202002);
    } else {
        await UserDao.create(newUser);
        res = resJson({});
    }
    return res;
};
// 获取用户
const getUsers = async option => {
    const users = await UserDao.findAll(option);
    const res = resJson(users);
    return res;
};
export default { addUser, getUsers };
