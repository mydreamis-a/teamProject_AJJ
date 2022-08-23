const dot = require("dotenv").config();

const config = {
  dev: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "ajj_project",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

module.exports = config;

// 08.23.02 수정
