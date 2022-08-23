const Sql = require("sequelize");

class DailyCheck extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "DailyCheck",
        tableName: "dailychecks",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.DailyCheck.belongsTo(db.User, { targetKey: "id" });
  }
}

module.exports = DailyCheck;
