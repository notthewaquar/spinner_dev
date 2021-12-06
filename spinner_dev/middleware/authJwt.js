const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  try {
    let bearerHeader = req.headers['authorization'];
    let token = null;
    if (bearerHeader) {
      token = bearerHeader.split('Bearer ')[1];
    }
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      console.log(decoded);
      // user id attached to req
      req.userId = decoded.id;
      req.role = decoded.authorities;
      next();
    });
  } catch (error) {
    return res.status(401).send({
      error: true,
      message: "Unauthorized!!"
    });
  }
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      if (roles.name === "admin") {
        next();
        return;
      }
      // for (let i = 0; i < roles.length; i++) {
      //   if (roles[i].name === "admin") {
      //     next();
      //     return;
      //   }
      // }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      if (roles.name === "moderator") {
        next();
        return;
      }
      // for (let i = 0; i < roles.length; i++) {
      //   if (roles[i].name === "moderator") {
      //     next();
      //     return;
      //   }
      // }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;