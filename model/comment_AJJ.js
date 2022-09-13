const Sql = require("sequelize");

// ㅜ 커뮤니티 공간의 댓글 테이블
class Comment extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 댓글 내용
        content: {
          type: Sql.STRING(200),
          allowNull: false,
        },
        // ㅜ 비밀 댓글의 설정 여부
        secret: {
          type: Sql.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        user_id: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        post_id: {
          type: Sql.INTEGER,
          allowNull: false,
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
    db.Comment.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
    db.Comment.belongsTo(db.Post, { foreignKey: "post_id", targetKey: "id" });
    db.Comment.hasMany(db.Comment, { foreignKey: "this_id", sourceKey: "id" });
    db.Comment.belongsTo(db.Comment, { foreignKey: "this_id", targetKey: "id" });
  }
}

module.exports = Comment;

// 09.13.12 수정
