const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// normal user
exports.signup = (req, res) => {
  const userRole = 'user'
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      Role.findAll({
        where: {
          name: userRole
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: 'User was registered successfully!' });
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// normal user
exports.signupUserOrModerator = (req, res) => {

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: req.body.roles
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: req.body.roles + ' was registered successfully!' });
          });
        });
      } else {
        res.send({ message: 'Cannot create user' });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        });
      }

      user.getRoles().then(roles => {
        // return res.send(roles)
        if (roles.length === 1) {
          const authorities = roles[0].name.toUpperCase();
          var token = jwt.sign(
            {
              id: user.id,
              authorities
            },
            config.secret, {
              expiresIn: 86400 // 24 hours
            }
          );

          res.status(200).send({
            // id: user.id,
            // username: user.username,
            // email: user.email,
            roles: authorities,
            accessToken: token,
            response: 'Signed In Successfully'
          });
        } else {
          res.status(401).send({ message: 'Unauthorized' });
        }

      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
