const Sql = require("sequelize");

// ㅜ 회원의 출석 체크 테이블
class DailyCheck extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 출석 체크한 날짜
        date: {
          type: Sql.DATE,
          allowNull: false,
          defaultValue: Sql.NOW,
        },
      },
      {
        sequelize,
        timestamps: true,
        updatedAt: false,
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
    db.DailyCheck.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
  }
}

module.exports = DailyCheck;

// 08.30.08 수정
