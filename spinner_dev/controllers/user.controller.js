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
  return res.json({
    userId: req.userId,
    role: req.role
  })
  const userId = req.userId;

  res.status(200).send("User Content." + userId);
};