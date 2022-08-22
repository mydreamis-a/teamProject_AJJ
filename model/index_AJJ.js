const { log } = console;
const Sql = require("sequelize");
const config = require("../config/config_AJJ").dev;

// ㅜ MySQL 연결 객체 생성
const { database, username, password } = config;
const sequelize = new Sql(database, username, password, config);

const db = {};
db.sequelize = sequelize;

module.exports = { sequelize };

// 08.23.02 수정
