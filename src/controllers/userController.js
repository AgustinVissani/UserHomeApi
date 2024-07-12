const { users } = require('../data/initialData');
const User = require('../models/userModel');
const Home = require('../models/homeModel');


// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    let filteredUsers = users;

    if (req.query.name) {
        filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
    }
    if (req.query.email) {
        filteredUsers = filteredUsers.filter(user =>
            user.email.toLowerCase().includes(req.query.email.toLowerCase())
        );
    }

    if (filteredUsers.length > 0) {
        res.status(200).json(filteredUsers);
    } else {
        res.status(404).json({ message: 'No users found' });
    }
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const user = users.find(u => u.id === req.params.userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = new User(name, email);
    users.push(newUser);
    res.status(201).json(newUser);
};

// Actualizar parcialmente un usuario
exports.updateUserPartially = (req, res) => {
    const user = users.find(u => u.id === req.params.userId);
    if (user) {
        Object.assign(user, req.body);
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Actualizar completamente un usuario
exports.updateUserCompletely = (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.userId);
    if (userIndex !== -1) {
        const { name, email } = req.body;
        const existingHomes = users[userIndex].homes;
        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].homes = existingHomes;
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Borrar un usuario
exports.deleteUser = (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.userId);
    if (userIndex !== -1) {
        if (users[userIndex].homes.length > 0) {
            res.status(400).json({ message: 'User has homes, cannot delete' });
        } else {
            users.splice(userIndex, 1);
            res.status(204).send();
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Obtener todas las viviendas de un usuario
exports.getUserHomes = (req, res) => {
    const user = users.find(u => u.id === req.params.userId);
    if (user) {
        const { city, street, country } = req.query;
        let homes = user.homes;
        if (city) homes = homes.filter(h => h.city === city);
        if (street) homes = homes.filter(h => h.street === street);
        if (country) homes = homes.filter(h => h.country === country);
        res.status(200).json(homes);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

/*---------HOME-USER--------*/

// Crear una vivienda para un usuario
exports.createHomeForUser = (req, res) => {  
    try {
        const user = users.find(u => u.id === req.params.userId);
        if (!user) {
            console.error("User not found:", req.params.userId);
            return res.status(404).json({ message: 'User not found' });
        }
        const { city, street, country } = req.body;
        const newHome = new Home(city, street, country);
        user.homes.push(newHome);
        res.status(201).json(newHome);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Actualizar una vivienda de un usuario
exports.updateHomeForUser = (req, res) => {
    const user = users.find(u => u.id === req.params.userId);
    if (user) {
        const home = user.homes.find(h => h.id === req.params.homeId);
        if (home) {
            Object.assign(home, req.body);
            res.status(200).json(home);
        } else {
            res.status(404).json({ message: 'Home not found' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Borrar una vivienda de un usuario
exports.deleteHomeForUser = (req, res) => {
    const user = users.find(u => u.id === req.params.userId);
    if (user) {
        const homeIndex = user.homes.findIndex(h => h.id === req.params.homeId);
        if (homeIndex !== -1) {
            user.homes.splice(homeIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Home not found' });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
