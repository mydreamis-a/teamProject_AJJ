const dot = require("dotenv").config();

const config = {
  dev: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "AJJ_DB",
    host: "127.0.0.1",
    dialec: "mysql",
  },
};

module.exports = config;

// 08.22.16 수정
