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
const session = require("express-session")
const { sequelize, User } = require("./model/index_AJJ");
const FileStore = require("session-file-store")(session);
const example = require("./router/example_AJJ");
const cart = require("./router/cart_router_AJJ");
const productsDB = require("./router/productsDB_AJJ");
const productsPage = require("./router/productsPage_router_AJJ");

const app = express();
const server = app.listen(PORT, () => {
  log("localhost:", PORT);
});
const io = socketio(server);

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
app.use("/example", example);
app.use("/", productsPage);
app.use("/cart", cart);

app.use(
  session({
    secret: process.env.JU_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

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
  let userName = "";
  let errorCode = "";
  jwt.verify(req.session.aT, process.env.JU_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      errorCode = "로그인을 해주세요";
      userName = "";
    } 
    else if(decoded){
      errorCode = "";
      userName = req.session.name;
    }
  });
  productsDB();
  res.render("main_AJJ",{userName,errorCode});
});

app.post("/login",(req,res)=>{
  let aT = req.session.aT;
  jwt.verify(aT, process.env.JU_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      const {email,password} = req.body;
      req.session.name = null;
      User.findAll({
        where: {
          email: email,
          password: password,
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
              expiresIn: "10s",
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
              expiresIn: "10s",
            }
          );
          req.session.aT = aT;
          req.session.rT = rT;
          req.session.name = user[0].name;
          console.log(req);
          productsDB();
          res.render("main_AJJ",{userName:req.session.name});
        })
        .catch((e) => {
          console.log(e);
        });
    } 
    else if(decoded){
      console.log("이미 로그인 되어있습니다.");
      productsDB();
      res.render("main_AJJ",{userName:req.session.name});
    }
  });
})
io.on("connection", (socket) => {
  
});

// 08.26.16 merge
