const Sql = require("sequelize");

// ㅜ 회원의 검색어 테이블
class Keyword extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 검색어 이름
        name: {
          type: Sql.STRING(100),
          allowNull: false,i
        },
        // ㅜ 검색 횟수
        count: {
          type: Sql.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Keyword",
        tableName: "keywords",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Keyword.belongsTo(db.User, { foreignKey: "user_id", sourceKey: "id" });
  }
}

module.exports = Keyword;

// 08.30.08 수정
