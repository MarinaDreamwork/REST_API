require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const routes = require('./routes');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;
const { migrate } = require('postgres-migrations');

app.set('port', PORT);
console.log('PORT', PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
  origin: '*',
  optionsSuccessStatus: 200
}));

app.use('/', routes);
app.get('*', (req, res) => {
  res.sendFile('Welcome to REST API service Nodejs and Express');
});

if(process.env.NODE_ENV === 'production') {
  console.log('production');
} else {
  console.log('development');
}

async function start() {
  try {
    pool.on('connect', () => {
      migrate(pool.options, './db/migrations');
    });
    pool.connect(err => {
      if(err) {
        console.log(chalk.bgRed('connection error:', err.stack))
      } else {  
        console.log(chalk.bgGreen('connected!'));     
      }
    });
    app.listen(PORT, () => {
    console.log(chalk.blue(`Server has been started on PORT ` + PORT));
});
  } catch(error) {
    console.log(chalk.bgRed(error.message));
    process.exit(1);
  }
};

start();