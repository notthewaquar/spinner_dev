const express = require('express');
const cors = require('cors');

const app = express();

// const db = require("./app/models");
const db = require('./models/index');
const Role = db.role;
const User = db.user;

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
//   testUsers();
// });

function initial() {
  Role.create({ id: 1, name: "user" });
  Role.create({ id: 2, name: "moderator" });
  Role.create({ id: 3, name: "admin" });
}

var bcrypt = require('bcryptjs');
function testUsers() {
  User.create({ username: 'abdul', email: 'abdul@gmail.com', password: bcrypt.hashSync('123456', 8) });
  User.create({ username: 'rishav', email: 'rishav@gmail.com', password: bcrypt.hashSync('123456', 8) });
  User.create({ username: 'vikrant', email: 'vikrant@gmail.com', password: bcrypt.hashSync('123456', 8) });
  User.create({ username: 'rohit', email: 'rohit@gmail.com', password: bcrypt.hashSync('123456', 8) });
}

var corsOptions = {
  origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Spinner application.' });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/report.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// https://www.bezkoder.com/node-js-jwt-authentication-mysql/
// https://sequelize.org/master/manual/model-basics.html
