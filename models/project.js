const Base = require('./beas');

class Project extends Base {
    constructor(props = 'myproject') {
        super(props)
    }
}
module.exports = new Project();