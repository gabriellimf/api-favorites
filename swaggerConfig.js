const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    ...require('./src/docs/base.yaml'),
  },
  apis: ['./src/docs/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;