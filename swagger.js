const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'HoneyShop API',
    version: '1.0.0',
    description: 'Ecommerce API for managing products, users, orders, etc.',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'x-access-token',
      description: 'Token de acceso necesario para la autenticación',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  tags: [
    {
      name: 'Users',
      description: 'Operaciones relacionadas con usuarios',
    },
    {
      name: 'Products',
      description: 'Operaciones relacionadas con productos',
    },
    {
      name: 'Orders',
      description: 'Operaciones relacionadas con las órdenes',
    },
    {
        name: 'Brands',
        description: 'Operaciones relacionadas con las marcas',
    },
    {
        name: 'Presentations',
        description: 'Operaciones relacionadas con las presentaciones',
    },
    {
        name: 'Roles',
        description: 'Operaciones relacionadas con los roles',
    },
    {
        name: 'Clients',
        description: 'Operaciones relacionadas con los clientes',
    }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Ruta de tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
