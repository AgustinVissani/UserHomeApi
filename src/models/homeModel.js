const { v4: uuidv4 } = require('uuid');

class Home {
    constructor(city, street, country) {
        this.id = uuidv4();
        this.city = city;
        this.street = street;
        this.country = country;
    }
}

module.exports = Home;
