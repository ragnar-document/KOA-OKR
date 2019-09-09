const Base = require('./beas');

class User extends Base {
    constructor(props = 'user') {
        super(props)
    }
}
module.exports = new User();