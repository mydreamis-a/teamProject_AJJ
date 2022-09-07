const dot = require("dotenv").config();

const config = {
  dev: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "ajj_project",
    host: "127.0.0.1",
    dialect: "mysql",
    //
    // ㅜ 한국 시간 설정
    timezone: "+09:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    //
    // ㅜ 쿼리 로그 비활성화
    logging: false,
  },
};

module.exports = config;

// 09.07.08 수정
