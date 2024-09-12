module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      digits: DataTypes.STRING,
      fotoUrl: DataTypes.STRING,
      workType: DataTypes.STRING,
      positionTitle: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lon: DataTypes.FLOAT,
      company: DataTypes.STRING,
      isLogin: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      dovote: DataTypes.BOOLEAN,
      dosurvey: DataTypes.BOOLEAN,
      dofeedback: DataTypes.BOOLEAN,
      fullname: DataTypes.STRING,
      currentLeave: DataTypes.INTEGER,
    });
    return User;
  };
  