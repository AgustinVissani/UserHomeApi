// src/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const initialData = require('./data/initialData');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User and Home API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
