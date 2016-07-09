'use strict';
module.exports = function(sequelize, DataTypes) {
  var loans = sequelize.define('loans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patron_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Loaned on date is required"
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Return by date is required"
        }
      }
    },
    returned_on: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        loans.belongsTo(models.patrons, {foreignKey: 'patron_id'});
        loans.belongsTo(models.books, {foreignKey: 'book_id'});
      }
    },
    timestamps: false  // I do NOT want timestamps here
  });
  return loans;
};
