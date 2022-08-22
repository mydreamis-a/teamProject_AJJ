const { log } = console;
const Sql = require("sequelize");
const config = require("../config/config_AJJ");

// ㅜ 시퀄라이즈 객체 생성
const { database, username, password } = config.dev;
const sequelize = new Sql(database, username, password);

// 08.22.16 수정
