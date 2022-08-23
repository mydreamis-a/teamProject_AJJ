const Sql = require("sequelize");

class Like extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // product_count: {
        //   type: Sql.INTEGER,
        //   allowNull: false,
        //   defaultValue: 1,
        // },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Like",
        tableName: "likes",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    // db.Like.belongsTo(db.User, { targetKey: "id" });
  }
}

module.exports = Like;
