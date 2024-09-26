require('dotenv').config();
const { dbConnectMysql, sequelize } = require('./database/database');	
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://18.118.124.35:3001"],
    methods: ['GET', 'POST', 'PUT'],
}));
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