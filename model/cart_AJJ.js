const Sql = require("sequelize");

class Cart extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        product_count: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        email: {
          type: Sql.STRING(40),
          allowNull: false,
          unique: true,
        },
        point: {
          type: Sql.INTEGER,
          defaultValue: 0,
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
    db.Cart.belongsTo(db.User, { targetKey: "id" });
  }
}

module.exports = Cart;
