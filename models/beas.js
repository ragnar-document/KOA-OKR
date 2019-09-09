const knex = require('./knex');

class Base {
    constructor(props) {
        this.table = props
    }
    insert(params) {
        return knex(this.table).insert(params);
    }
    select(params) {
        return knex(this.table).select().where(params).orderBy('id', 'desc');
    }
    all(user_id) {
        return knex(this.table).where({ user_id }).select();
    }
    single(id) {
        return knex(this.table).where('id', '=', id).select();
    }
    del(id) {
        return knex(this.table).where('id', '=', id).delete();
    }
    where(params) {
        return knex(this.table).where(params).select();
    }
    updata(id, params) {
        return knex(this.table).where('id', '=', id).update(params);
    }
}

module.exports = Base;