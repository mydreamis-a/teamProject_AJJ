const Sql = require("sequelize");

// ㅜ 커뮤니티 공간의 게시판 테이블
class Post extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 게시글 제목
        title: {
          type: Sql.STRING(200),
          allowNull: false,
        },
        // ㅜ 게시글 내용
        content: {
          type: Sql.STRING(200),
          allowNull: false,
        },
        user_id: {
          type: Sql.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
    db.Post.hasMany(db.Comment, { foreignKey: "post_id", sourceKey: "id" });
    db.Post.belongsTo(db.AJYproduct, { foreignKey: "ajyproduct_num", targetKey: "id" });
    db.Post.belongsTo(db.JBHproduct, { foreignKey: "jbhproduct_num", targetKey: "id" });
    db.Post.belongsTo(db.JJWproduct, { foreignKey: "jjwproduct_num", targetKey: "id" });
  }
}

module.exports = Post;

// 09.13.12 수정
