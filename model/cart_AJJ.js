const Sql = require("sequelize");

// ㅜ 회원의 장바구니 테이블
class Cart extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        product_count: {
          type: Sql.INTEGER,
          allowNull: false,
          defaultValue: 1,
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
        modelName: "Cart",
        tableName: "carts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Cart.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
    db.Cart.belongsTo(db.AJYproduct, { foreignKey: "ajyproduct_num", targetKey: "id" });
    db.Cart.belongsTo(db.JBHproduct, { foreignKey: "jbhproduct_num", targetKey: "id" });
    db.Cart.belongsTo(db.JJWproduct, { foreignKey: "jjwproduct_num", targetKey: "id" });
  }
}

module.exports = Cart;

// 09.13.12 수정
