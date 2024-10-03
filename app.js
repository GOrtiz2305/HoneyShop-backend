require('dotenv').config();
const { dbConnectMysql, sequelize } = require('./database/database');	
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json())
/*app.use(cors({
    origin: ["http://18.118.124.35:3001"],
    methods: ['GET', 'POST', 'PUT'],
}));*/

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "http://ortizdev.xyz",
        //"http://localhost:3000",
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

const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await dbConnectMysql();
});

sequelize.sync()
    .then(() => {
        
    });