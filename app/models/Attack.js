module.exports = (sequelize, DataTypes) => {
    const Attack = sequelize.define("Attack", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sourceCountry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destinationCountry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return Attack;
  };
  