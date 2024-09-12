const db = require('./models/index');


db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });
