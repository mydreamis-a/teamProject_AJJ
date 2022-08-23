const Sql = require("sequelize");

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
    db.Cart.belongsTo(db.User, { targetKey: "id" });
    db.Cart.hasMany(db.AJYproduct, { foreignKey: "AJYproduct_num", sourceKey: "id" })
    db.Cart.hasMany(db.JBHproduct, { foreignKey: "JBHproduct_num", sourceKey: "id" })
    db.Cart.hasMany(db.JJWproduct, { foreignKey: "JJWproduct_num", sourceKey: "id" })
  }
}

module.exports = Cart;
