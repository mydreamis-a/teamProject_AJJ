const Sql = require("sequelize");

class Comment extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sql.STRING(100),
          allowNull: false,
        },
        secret: {
          type: Sql.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User, { targetKey: "id" });
    db.Comment.belongsTo(db.AJYproduct, { foreignKey: "AJYproduct_num", targetKey: "id" });
    db.Comment.belongsTo(db.JBHproduct, { foreignKey: "JBHproduct_num", targetKey: "id" });
    db.Comment.belongsTo(db.JJWproduct, { foreignKey: "JJWproduct_num", targetKey: "id" });
  }
}

module.exports = Comment;
