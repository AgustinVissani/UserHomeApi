const User = require('../models/userModel');
const Home = require('../models/homeModel');
// name, email
const users = [
    new User('Emily Johnson', 'emily.johnson@example.com'),
    new User('David Lee', 'd.lee@example.com'),
    new User('Michael Davis', 'michael@example.com')
];

// city, street, country;
users[0].homes.push(new Home('Los Angeles', 'Hollywood Boulevard', 'USA'));
users[1].homes.push(new Home('New York City', 'Broadway', 'USA'));
users[2].homes.push(new Home('London', 'Oxford Street', 'UK'));

module.exports = { users };
