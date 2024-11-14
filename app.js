require('dotenv').config();

const { dbConnectMysql, sequelize } = require('./database/database');	
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cookieParser = require('cookie-parser');
const app = express();
const https = require('https');
const fs = require('fs');

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Error handling middleware (recommended for production)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log errors to console
  res.status(500).send('Internal Server Error'); // Send generic error response
});

// CORS configuration for both HTTP and HTTPS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (adjust for production)
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers',
 'Content-Type, Authorization, x-access-token'); // Adjust for specific headers
  res.setHeader('Access-Control-Allow-Credentials', true); // Allow cookies
  next();
});

app.use(express.json())

app.use(cookieParser());

app.listen(process.env.HTTP_PORT || 3000, () => {
  console.log(`HTTP Server listening on port ${process.env.HTTP_PORT || 3000}`);
});

if (process.env.HTTPS_ENABLED === 'true') {
  try {
    const options = {
      key: fs.readFileSync('/home/ubuntu/projects/privkey.pem'),
      cert: fs.readFileSync('/home/ubuntu/projects/cert.pem'),
    };

    const httpsServer = https.createServer(options, app);

    httpsServer.listen(process.env.HTTPS_PORT || 443, () => {
      console.log(`HTTPS Server listening on port ${process.env.HTTPS_PORT || 443}`);
    });
  } catch (error) {
    console.error('HTTPS Server Error:', error);
  }
}

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((error) => console.error('Database synchronization error:', error));

const routes = require('./routes/routes');
app.use('/api', routes);