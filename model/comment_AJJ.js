const Sql = require("sequelize");

// ㅜ 커뮤니티 공간의 댓글 테이블
class Comment extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 댓글 내용
        content: {
          type: Sql.STRING(100),
          allowNull: false,
        },
        // ㅜ 대댓글을 위한 현재 댓글의 id
        this_num: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        // ㅜ 비밀 댓글로의 설정 여부
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
    db.Comment.belongsTo(db.AJYproduct, { foreignKey: "ajyproduct_num", targetKey: "id" });
    db.Comment.belongsTo(db.JBHproduct, { foreignKey: "jbhproduct_num", targetKey: "id" });
    db.Comment.belongsTo(db.JJWproduct, { foreignKey: "jjwproduct_num", targetKey: "id" });
  }
}

module.exports = Comment;
