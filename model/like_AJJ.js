const Sql = require("sequelize");

// ㅜ 상품의 좋아요 수에 대한 테이블
class Like extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {},
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
    db.Like.belongsTo(db.User, { targetKey: "id" });
    db.Like.belongsTo(db.AJYproduct, { foreignKey: "ajyproduct_num", targetKey: "id" });
    db.Like.belongsTo(db.JBHproduct, { foreignKey: "jbhproduct_num", targetKey: "id" });
    db.Like.belongsTo(db.JJWproduct, { foreignKey: "jjwproduct_num", targetKey: "id" });
  }
}

module.exports = Like;
