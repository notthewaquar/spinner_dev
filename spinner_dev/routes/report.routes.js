const { authJwt } = require('../middleware');
const controller = require('../controllers/report.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/report', [authJwt.verifyToken], controller.userReport);

  app.get(
    '/api/report/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    '/api/report/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
