const { v4: uuidv4 } = require('uuid');

class User {
    constructor(name, email) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.homes = [];
    }
}

module.exports = User;
