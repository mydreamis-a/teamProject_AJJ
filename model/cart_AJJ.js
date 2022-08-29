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

// 08.30.07 수정
