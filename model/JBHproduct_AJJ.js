const Sql = require("sequelize");

// ㅜ 주병현 상점의 상품 테이블
class JBHproduct extends Sql.Model {
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
        modelName: "JBHproduct",
        tableName: "jbhproducts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.JBHproduct.hasOne(db.Like, { foreignKey: "jbhproduct_num", sourceKey: "id" });
    db.JBHproduct.hasOne(db.Cart, { foreignKey: "jbhproduct_num", sourceKey: "id" });
    db.JBHproduct.hasMany(db.Comment, { foreignKey: "jbhproduct_num", sourceKey: "id" });
    // 추가
    db.JBHproduct.hasMany(db.BestItem, { foreignKey: "jbhproduct_num", sourceKey: "id" }); 
  }
}



module.exports = JBHproduct;

// 08.29.01 수정
