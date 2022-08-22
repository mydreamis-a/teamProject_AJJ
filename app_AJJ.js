const PORT = 8282;
const { log } = console;
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql2");

// ㅜ 시퀄라이즈 패키지이자 생성자
const Sql = require("sequelize");
const express = require("express");
const jwt = require("jsonwebtoken");
const socketio = require("socket.io");
const dot = require("dotenv").config();
const session = require("express-session");
const { sequelize } = require("./model/index_AJJ");
const FileStore = require("session-file-store")(session);

//
const app = express();
const server = app.listen(PORT, () => {
  log("localhost:", PORT);
});
const io = socketio(server);

//
// ㅜ body-parser
app.use(express.urlencoded({ extended: false }));

// ㅜ html 렌더링에 뷰 엔진 설정
app.set("view engine", "html");

// ㅜ html의 뷰 엔진을 ejs 렌더링 방식으로 변경
app.engine("html", ejs.renderFile);

// ㅜ views 키 값에 렌더링할 파일들을 모아둔 폴더의 주소 저장
app.set("views", path.join(__dirname, "/view"));

// ㅜ 절대 경로 설정
app.use(express.static(__dirname));
app.use("/img", express.static(path.join(__dirname, "img_Jang")));
app.use("/img", express.static(path.join(__dirname, "/img_Ahn_Ju")));

app.use(
  session({
    secret: process.env.JU_SECRET_KEY,
    //
    // ㅜ 저장하고 불러올 때 다시 저장할 지 여부
    resave: false,
    //
    // ㅜ 저장 시 초기화 여부
    saveUninitialized: true,
    store: new FileStore(),
  })
);

sequelize.sync({ force: false }).then(() => { log("AJJ의 DB") }).catch((err) => { log(err) });

// ㅜ 메인 페이지
app.get("/", (req, res) => {
  res.render("main_AJJ");
});

// 08.23.01 수정
