const Sql = require("sequelize");

// ㅜ 검색 기능을 위한 상품의 키워드 테이블
class ProductKeyword extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 상품의 키워드명
        keyword: {
          type: Sql.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "ProductKeyword",
        tableName: "productkeywords",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.ProductKeyword.belongsToMany(db.AJYproduct, { through: "ajyproduct_num" });
    db.ProductKeyword.belongsToMany(db.JBHproduct, { through: "jbhproduct_num" });
    db.ProductKeyword.belongsToMany(db.JJWproduct, { through: "jjwproduct_num" });
  }
}

module.exports = ProductKeyword;
