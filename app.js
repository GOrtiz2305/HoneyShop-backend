require('dotenv').config();

const { dbConnectMysql, sequelize } = require('./database/database');	

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const https = require('https');
const fs = require('fs');

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

// app.use((req, res, next) => {
//     res.setHeader(
//       "Access-Control-Allow-Origin",
//       "*"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Private-Network", true);
//     //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//     res.setHeader("Access-Control-Max-Age", 7200);
  
//     next();
//   });

/*app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await dbConnectMysql();
});*/

app.listen(process.env.HTTP_PORT || 3000, () => {
  console.log(`HTTP Server listening on port ${process.env.HTTP_PORT || 3000}`);
});

if (process.env.HTTPS_ENABLED === 'true') {
  try {
    const options = {
      key: fs.readFileSync('/home/ubuntu/projects/HoneyShop-backend/privkey.pem'),
      cert: fs.readFileSync('/home/ubuntu/projects/HoneyShop-backend/cert.pem'),
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

//const PORT = process.env.PORT || 3001;

// try {
//   const options = {
//     key: fs.readFileSync('/etc/letsencrypt/live/backend.ortizdev.xyz/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/backend.ortizdev.xyz/cert.pem')
//   };
  
//   https.createServer(options, async (req, res) => {
//     res.writeHead(200);
//     await dbConnectMysql();
//     //res.end('Hello, world!');
//   }).listen(PORT);
// }
// catch (e) {
//   console.error(e);
// }

const routes = require('./routes/routes');
app.use('/api', routes);