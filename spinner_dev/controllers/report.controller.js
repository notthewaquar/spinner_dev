const db = require('../models');
const Report = db.report;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// report 
exports.userReport = (req, res) => {
  const userId = req.userId;


  res.status(200).send("User Content." + userId);
};