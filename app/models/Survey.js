module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define("Survey", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      values: DataTypes.ARRAY(DataTypes.INTEGER),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      userId: DataTypes.INTEGER,
    });
    return Survey;
  };
  