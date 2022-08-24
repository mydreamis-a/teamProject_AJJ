const Sql = require("sequelize");

// ㅜ 장지원 상점의 상품 테이블
class JJWproduct extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sql.STRING(40),
          allowNull: false,
          unique: true,
        },
        price: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        img: {
          type: Sql.STRING(40),
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
    db.JJWproduct.hasMany(db.Comment, { foreignKey: "jjwproduct_num", sourceKey: "id" });
    db.JJWproduct.belongsToMany(db.ProductKeyword, { through: "jjwproduct_num" });
  }
}

module.exports = JJWproduct;
