const Base = require('./beas');

class Target extends Base{
    constructor(props = 'target') {
        super(props)
    }
}
module.exports = new Target();