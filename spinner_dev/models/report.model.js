module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define('reports', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.STRING
    },
    fund_id: {
      type: Sequelize.STRING
    }
  });

  return Report;
};
