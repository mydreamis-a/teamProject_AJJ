const { log } = console;
const Sql = require("sequelize");
const User = require("./user_AJJ");
const Cart = require("./cart_AJJ");
const Like = require("./like_AJJ");
const Comment = require("./comment_AJJ");
const AJYproduct = require("./AJYproduct_AJJ");
const JBHproduct = require("./JBHproduct_AJJ");
const JJWproduct = require("./JJWproduct_AJJ");
const DailyCheck = require("./dailyCheck_AJJ");
const ProductKeyword = require("./productKeyword_AJJ");
const config = require("../config/config_AJJ").dev;

// ㅜ MySQL 연결 객체 생성
const { database, username, password } = config;
const sequelize = new Sql(database, username, password, config);

const db = {};
db.User = User;
db.Cart = Cart;
db.Like = Like;
db.Comment = Comment;
db.sequelize = sequelize;
db.AJYproduct = AJYproduct;
db.JBHproduct = JBHproduct;
db.JJWproduct = JJWproduct;
db.DailyCheck = DailyCheck;
db.ProductKeyword = ProductKeyword;

User.init(sequelize);
Cart.init(sequelize);
Like.init(sequelize);
Comment.init(sequelize);
AJYproduct.init(sequelize);
JBHproduct.init(sequelize);
JJWproduct.init(sequelize);
DailyCheck.init(sequelize);
ProductKeyword.init(sequelize);

User.associate(db);
Cart.associate(db);
Like.associate(db);
Comment.associate(db);
AJYproduct.associate(db);
JBHproduct.associate(db);
JJWproduct.associate(db);
DailyCheck.associate(db);
ProductKeyword.associate(db);

module.exports = { sequelize, User, Cart, Like, Comment, AJYproduct, JBHproduct, JJWproduct, DailyCheck, ProductKeyword };

// 08.23.02 수정
