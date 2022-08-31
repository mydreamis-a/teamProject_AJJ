const Sql = require("sequelize");

// ㅜ 회원의 출석 체크 테이블
class BestItem extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        name : {
          type: Sql.STRING(100),
          allowNull: false,
        },
        email : {
          type : Sql.STRING(100),
          allowNull : false
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "BestItem",
        tableName: "bestItems",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }
  static associate(db) {
    db.BestItem.belongsTo(db.AJYproduct, { foreignKey: "ajyproduct_num", targetKey: "id" });
    db.BestItem.belongsTo(db.JBHproduct, { foreignKey: "jbhproduct_num", targetKey: "id" });
    db.BestItem.belongsTo(db.JJWproduct, { foreignKey: "jjwproduct_num", targetKey: "id" });
    db.BestItem.belongsTo(db.User, { foreignKey: "email", targetKey: "email" });
  }
}
/*

위 상의 foreignkey와 primarykey를 설정하면
sequlize는 자동으로 ON DELETE SET NULL와 ON UPDATE CASCADE를 설정한다.

CONSTRAINT `bestitems_ibfk_1` FOREIGN KEY (`ajyproduct_num`) REFERENCES `ajyproducts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
CONSTRAINT `bestitems_ibfk_2` FOREIGN KEY (`jbhproduct_num`) REFERENCES `jbhproducts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
CONSTRAINT `bestitems_ibfk_3` FOREIGN KEY (`jjwproduct_num`) REFERENCES `jjwproducts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE

ON DELETE SET NULL
ON UPDATE SET NULL
옵션 SET NULL -> 부모테이블에서 primary 값이 수정 또는 삭제될 경우
하위테이블의 reference값은 존재할 수 없습니다. 옵션이 없을 경우는 에러가 발생하고 옵션 SET NULL 로 정의되면 하위테이블의 reference값이  NULL 값으로 변경되면서 참조무결성을 유지합니다.

* ON UPDATE CASCADE
옵션 CASCADE -> 부모테이블에서 primary 값이 수정될 경우
옵션 CASCADE 로 정의되면 하위테이블의 reference값은 변경된 상위테이블의 수정된 값을 가지면서 참조무결성을 유지합니다.

* ON DELETE CASCADE
옵션 CASCADE -> 부모테이블에서 primary 값이 삭제될 경우
옵션 CASCADE 로 정의되면 하위테이블의 reference값은 삭제되면서 참조무결성을 유지합니다.

*/

module.exports = BestItem;
