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

const { sequelize, User, AJYproduct } = require("./model/index_AJJ");
const sharedsession = require("express-socket.io-session");
// const FileStore = require("session-file-store")(session);

// ㅜ 라우터 예시
const example = require("./router/example_AJJ");
const cartDB = require("./router/cartDB_router_AJJ");
const productsDB = require("./router/productsDB_AJJ");
const cartPage = require("./router/cartPage_router_AJJ");
const productsPage = require("./router/productsPage_router_AJJ");

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

app.use(session);
io.use(sharedsession(session));

// app.use(
//   session({
//     secret: process.env.JU_SECRET_KEY,
//     //
//     // ㅜ 저장하고 불러올 때 다시 저장할 지 여부
//     resave: false,
//     //
//     // ㅜ 저장 시 초기화 여부
//     saveUninitialized: true,
//     store: new FileStore(),
//   })
// );

// ㅜ 서버 실행 시 MySQL 연동
sequelize
  .sync({ force: true })
  .then(() => {
    log("AJJ's DB connection");
  })
  .catch((err) => {
    log(err);
  });

// ㅜ 메인 페이지
app.get("/", (req, res) => {
  //
  AJYproduct.findAll({}).then((value) => {
    //
    if (value[0]) res.render("main_AJJ");
    //
    else productsDB().then(res.render("main_AJJ"));
  });
})

io.on("connection", (socket) => {
  socket.emit("signCheck");
  socket.on("login", (userInfor) => {
    socket.emit("signCheck");
    const userInputEmail = userInfor.userInputEmail; // 유저가 입력한 이메일 값
    const userInputPw = userInfor.userInputPw; // 유저가 입력한 패수워드 값
    const a = 0;
    User.findAll({
      where: {
        email: userInputEmail,
        password: userInputPw,
      },
    })
      .then((user) => {
        let aT = jwt.sign(
          {
            password: user[0].password,
            type: "JWT",
          },
          process.env.JU_ACCESS_TOKEN,
          {
            issuer: "주병현",
            expiresIn: "1m",
          }
        );
        let rT = jwt.sign(
          {
            password: user[0].password,
            type: "JWT",
          },
          process.env.JU_REFRESH_TOKEN,
          {
            issuer: "주병현",
            expiresIn: "3m",
          }
        );
        socket.handshake.session.aT = aT;
        socket.handshake.session.rT = rT;
        socket.handshake.session.name = user[0].name;
        socket.handshake.session.save();
        console.log(socket);
        socket.emit("loginSuccess", user[0].name);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  socket.on("signUp", (inputName, inputTel, inputEmail, inputPassword) => {
    socket.emit("signCheck");
    const inputNameData = inputName;
    const inputTelData = inputTel;
    const inputEmailData = inputEmail;
    const inputPasswordData = inputPassword;
    User.findOrCreate({
      where: {
        phone: inputTelData,
        email: inputEmailData,
      },
      defaults: {
        name: inputNameData,
        phone: inputTelData,
        email: inputEmailData,
        password: inputPasswordData,
      },
    })
      .then((e) => {
        socket.emit("signSuccess", inputNameData);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  socket.on("signCheck", () => {
    let userName = socket.handshake.session.name;
    jwt.verify(socket.handshake.session.aT, process.env.JU_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        console.log("로그인 해주세요");
      } else if (decoded) {
        socket.emit("loginSuccess", userName);
      }
    });
  });
});

// 08.26.16 merge
