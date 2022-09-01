const Sql = require("sequelize");
const User = require("./user_AJJ");
const Cart = require("./cart_AJJ");
const Like = require("./like_AJJ");
const Comment = require("./comment_AJJ");
const Keyword = require("./keyword_AJJ");
const AJYproduct = require("./AJYproduct_AJJ");
const JBHproduct = require("./JBHproduct_AJJ");
const JJWproduct = require("./JJWproduct_AJJ");
const DailyCheck = require("./dailyCheck_AJJ");
const BestItem = require("./bestItem_AJJ");
const config = require("../config/config_AJJ").dev;
//
// ㅜ MySQL 연결 객체 생성
const { database, username, password } = config;
const sequelize = new Sql(database, username, password, config);
//
const db = {};
db.User = User;
db.Cart = Cart;
db.Like = Like;
db.Comment = Comment;
db.Keyword = Keyword;
db.sequelize = sequelize;
db.AJYproduct = AJYproduct;
db.JBHproduct = JBHproduct;
db.JJWproduct = JJWproduct;
db.DailyCheck = DailyCheck;
db.BestItem = BestItem;
//
User.init(sequelize);
Cart.init(sequelize);
Like.init(sequelize);
Comment.init(sequelize);
Keyword.init(sequelize);
AJYproduct.init(sequelize);
JBHproduct.init(sequelize);
JJWproduct.init(sequelize);
DailyCheck.init(sequelize);
BestItem.init(sequelize);
//
User.associate(db);
Cart.associate(db);
Like.associate(db);
Comment.associate(db);
Keyword.associate(db);
AJYproduct.associate(db);
JBHproduct.associate(db);
JJWproduct.associate(db);
DailyCheck.associate(db);
BestItem.associate(db);
//
module.exports = { sequelize, User, Cart, Like, Comment, Keyword, AJYproduct, JBHproduct, JJWproduct, DailyCheck, BestItem };
//
// 09.01.13 수정
