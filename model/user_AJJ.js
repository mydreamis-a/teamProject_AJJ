const Sql = require("sequelize");

// ㅜ 가입한 회원의 정보 테이블
class User extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 이름
        name: {
          type: Sql.STRING(20),
          allowNull: false,
        },
        // ㅜ 전화 번호
        phone: {
          type: Sql.STRING(20),
          allowNull: false,
          unique: true,
        },
        // ㅜ 이메일
        email: {
          type: Sql.STRING(100),
          allowNull: false,
          unique: true,
        },
        // ㅜ 비밀 번호
        password: {
          type: Sql.STRING(255),
          allowNull: false,
        },
        // ㅜ 보유 포인트
        point: {
          type: Sql.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Like, { foreignKey: "user_id", sourceKey: "email"});
    db.User.hasMany(db.BestItem, { foreignKey: "email", sourceKey: "email" });
    db.User.hasMany(db.Cart, { foreignKey: "user_id", sourceKey: "id" });
    db.User.hasMany(db.Comment, { foreignKey: "user_id", sourceKey: "id" });
    db.User.hasMany(db.Keyword, { foreignKey: "user_id", sourceKey: "id" });
    db.User.hasMany(db.DailyCheck, { foreignKey: "user_id", sourceKey: "id" });
  }
}

module.exports = User;

// 08.30.07 수정
