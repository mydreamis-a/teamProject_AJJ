const Sql = require("sequelize");

// ㅜ 회원의 장바구니 테이블
class Cart extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 안주영 상점의 상품일 경우에 담은 상품 번호
        ajyproduct_num: {
          type: Sql.INTEGER,
          unique: true,
        },
        // ㅜ 주병현 상점의 상품일 경우에 담은 상품 번호
        jbhproduct_num: {
          type: Sql.INTEGER,
          unique: true,
        },
        // ㅜ 장지원 상점의 상품일 경우에 담은 상품 번호
        jjwproduct_num: {
          type: Sql.INTEGER,
          unique: true,
        },
        product_count: {
          type: Sql.INTEGER,
          allowNull: false,
          defaultValue: 1,
        }
      },
      {
        sequelize,
        timestamps: true,
        updatedAt: false,
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
    db.Cart.belongsTo(db.User, { targetKey: "id" });
  }
}

module.exports = Cart;
