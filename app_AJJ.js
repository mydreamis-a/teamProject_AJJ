const PORT = 3000;
const { log } = console;
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql2");

/**
 * 시퀄라이즈 패키지이자 생성자
 */
const Sql = require("sequelize");
const express = require("express");
const jwt = require("jsonwebtoken");
const socketio = require("socket.io");
const dot = require("dotenv").config();

const session = require("express-session")({
  secret: process.env.JU_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
});

const {
  sequelize,
  User,
  AJYproduct,
  DailyCheck,
} = require("./model/index_AJJ");
const sharedsession = require("express-socket.io-session");
// const FileStore = require("session-file-store")(session);

// ㅜ 라우터
const cartDB = require("./router/cartDB_AJJ");
const example = require("./router/example_AJJ");
const cartPage = require("./router/cartPage_AJJ");
const productsDB = require("./controller/productsDB_AJJ");
const productsPage = require("./router/productsPage_AJJ");
const dailyCheck = require("./router/dailyCheck_AJJ");

//
const app = express();
const server = app.listen(PORT, () => {
  log("localhost:", PORT);
});
const io = socketio(server);

//
let boolCheck = false;
let loginCheck = 0;
let userToken = 0;
let user = 0;

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

// ㅜ 해당 요청 주소에 대해서 라우터 설정
app.use("/cartList", cartPage);
app.use("/example", example);
app.use("/", productsPage);
app.use("/cart", cartDB);
app.use("/dailyCheck", dailyCheck);

app.use(session);
io.use(sharedsession(session));

// ㅜ 서버 실행 시 MySQL 연동
sequelize
  .sync({ force: false })
  .then(() => {
    log("AJJ's DB connection");
  })
  .catch((err) => {
    log(err);
  });

// ㅜ 메인 페이지
app.get("/", (req, res) => {
  //
  User.findAll({}).then((value) => {
    //
    if (value[0]) res.render("main_AJJ");
    else {
      productsDB().then(() => {
        //
        User.create({
          name: "똥",
          phone: "01024242424",
          email: "a@a.com",
          password: "acca3434",
        }).then(() => res.render("main_AJJ"));
      });
    }
  });
});
// ㅜ 주영님 코드

let adminArray = new Array();
let userArray = new Array();

// 유저의 실시간 채팅
io.sockets.on("connection", (socket) => {
  // 유저의 전화상담
  socket.on("callChat", () => {
    socket.emit("callChat2", () => {});
  });

  // 유저의 실시간 상담
  socket.on("liveChat", () => {
    socket.emit("liveChat2");
  });

  // 상담하기 누르면 안녕하세요 띄우는거
  socket.on("liveHi", (data) => {
    // userArray.push(data.name);
    // userArray.forEach(el => {
    // });
    socket.join(data.name);
    // 유저 들어왔을 때 알림 이벤트 요청
    socket.emit("liveHi2", data);
    // 유저 들어오면 관리자 소켓아이디 통해서 옵션 추가 이벤트
    io.to(adminArray[0]).emit("addOption", data);
  });

  socket.on("change", (data) => {
    socket.join(data);
    // io.to(data).emit("message",data);
  });
  // 관리자가 로그인하면 관리자 소켓을 배열 첫번째에 담는다
  socket.on("admin", () => {
    adminArray.push(socket.id);
    socket.emit("adminHi");
  });

  socket.on("message", (data) => {
    if (!data.message) return;
    // 관리자한테 보내는 메세지
    io.to(adminArray[0]).emit("adminChat", data);
    // 자기 자신에게 보내는 소세지
    socket.emit("usersChat", data);
  });

  socket.on("adminmessage", (data) => {
    if (!data.message) return;
    // 관리자한테 보내는 메세지
    io.to(data.name).emit("usersChat", {
      name: "admin",
      message: data.message,
    });
  });
});

// 08.26.16 merge
