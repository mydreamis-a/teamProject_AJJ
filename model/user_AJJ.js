const Sql = require("sequelize");

class User extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sql.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sql.STRING(255),
          allowNull: false,
        },
        name: {
          type: Sql.STRING(20),
          allowNull: false,
        },
        phone: {
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
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Cart, { sourceKey: "id" });
  }
}

module.exports = User;
