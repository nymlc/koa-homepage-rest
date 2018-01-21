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
export default { addUser };
