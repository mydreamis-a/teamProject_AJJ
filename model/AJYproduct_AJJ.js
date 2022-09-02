const Sql = require("sequelize");

// ㅜ 안주영 상점의 상품 테이블
class AJYproduct extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        // ㅜ 상품명
        name: {
          type: Sql.STRING(200),
          allowNull: false,
          unique: true,
        },
        // ㅜ 가격
        price: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        // ㅜ 이미지 경로
        img: {
          type: Sql.STRING(200),
          allowNull: false,
        },
        // ㅜ 재고 수량
        stock: {
          type: Sql.INTEGER,
          allowNull: false,
        },
        // ㅜ 카테고리 분류명
        category: {
          type: Sql.STRING(40),
          allowNull: false,
        },
        // ㅜ 특징에 대한 태그 (ex 기부, 추천, 인기)
        tag: {
          type: Sql.STRING(20),
        },
        // ㅜ 상품 소개
        content: {
          type: Sql.STRING(100),
        },
        // ㅜ 좋아요 수
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
        modelName: "AJYproduct",
        tableName: "ajyproducts",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.AJYproduct.hasOne(db.Like, { foreignKey: "ajyproduct_num", sourceKey: "id" });
    db.AJYproduct.hasOne(db.Cart, { foreignKey: "ajyproduct_num", sourceKey: "id" });
    db.AJYproduct.hasMany(db.Comment, { foreignKey: "ajyproduct_num", sourceKey: "id" });
    // 추가
    db.AJYproduct.hasMany(db.BestItem, { foreignKey: "ajyproduct_num", sourceKey: "id" });
    // 추가
  }
}

module.exports = AJYproduct;

// 08.29.01 수정
