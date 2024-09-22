const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    failOnErrors: true,
        definition: {
            openapi: '3.1.0',
            info: {
                title: 'Wibu Collection API',
                version: '1.0.0',
                description: 'A Wibu Collection API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
};
const specs = swaggerJsdoc(options);
module.exports = {
    specs,
    swaggerUi,
};