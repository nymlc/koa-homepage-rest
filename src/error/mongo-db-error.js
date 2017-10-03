import util from 'util';

const mongodbError = message => {
    Error.call(this, message);
};

util.inherits(mongodbError, Error);
export default mongodbError;
