require('dotenv').config();
const { dbConnectMysql, sequelize } = require('./database/database');	
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const https = require('https');
const fs = require('fs');

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

// Cargar el certificado SSL y la clave privada
const privateKey = fs.readFileSync('/etc/letsencrypt/live/backend.ortizdev.xyz/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/backend.ortizdev.xyz/fullchain.pem');

// Crear el servidor HTTPS
const httpsServer = https.createServer({
  key: privateKey,
  cert: certificate
}, app);

const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await dbConnectMysql();
});

// Iniciar el servidor
httpsServer.listen(port, async () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${port}`);
  await dbConnectMysql();
});

sequelize.sync()
    .then(() => {
        
    });