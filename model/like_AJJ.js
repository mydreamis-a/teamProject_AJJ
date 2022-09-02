const Sql = require("sequelize");

// ㅜ 상품의 좋아요 수에 대한 테이블
class Like extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sql.STRING(100),
          allowNull: false,
        },
        like_check : {
          type: Sql.INTEGER,
          allowNull : false
        }
      },
      {
        sequelize,
        timestamps: true,
        updatedAt: false,
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
    db.Like.belongsTo(db.User, { foreignKey: "user_id", targetKey: "email" });
    db.Like.belongsTo(db.AJYproduct, { foreignKey: "ajyproduct_num", targetKey: "id" });
    db.Like.belongsTo(db.JBHproduct, { foreignKey: "jbhproduct_num", targetKey: "id" });
    db.Like.belongsTo(db.JJWproduct, { foreignKey: "jjwproduct_num", targetKey: "id" });
  }
}

module.exports = Like;

// 08.29.18 수정
