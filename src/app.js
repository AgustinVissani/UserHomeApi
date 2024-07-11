// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const setupSwagger = require('./swagger');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Registra las rutas
app.use('/', routes);

// Configurar Swagger
setupSwagger(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
