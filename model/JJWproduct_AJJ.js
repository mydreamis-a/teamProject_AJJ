const Sql = require("sequelize");

// ㅜ 장지원 상점의 상품 테이블
class JJWproduct extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sql.STRING(200),
          allowNull: false,
          unique: true,
        },
        price: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        img: {
          type: Sql.STRING(200),
          allowNull: false,
        },
        stock: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        category: {
          type: Sql.STRING(40),
          allowNull: false,
        },
        tag: {
          type: Sql.STRING(20),
        },
        content: {
          type: Sql.STRING(100),
        },
        like_count: {
          type: Sql.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        updatedAt: false,
        underscored: true,
        modelName: "JJWproduct",
        tableName: "jjwproducts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.JJWproduct.hasOne(db.Like, { foreignKey: "jjwproduct_num", sourceKey: "id" });
    db.JJWproduct.hasOne(db.Cart, { foreignKey: "jjwproduct_num", sourceKey: "id" });
    db.JJWproduct.hasMany(db.Comment, { foreignKey: "jjwproduct_num", sourceKey: "id" });
    // 추가
    db.JJWproduct.hasMany(db.BestItem, { foreignKey: "jjwproduct_num", sourceKey: "id" });
  }
}

module.exports = JJWproduct;

// 08.29.01 수정
