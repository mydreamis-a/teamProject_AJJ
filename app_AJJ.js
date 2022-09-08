const PORT = 3000;
const { log } = console;
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql2");
//
// ㅜ 시퀄라이즈 패키지이자 생성자
const Sql = require("sequelize");
const express = require("express");
const jwt = require("jsonwebtoken");
const socketio = require("socket.io");
const dot = require("dotenv").config();
const cookie = require("cookie-parser");
const session = require("express-session");
const responseTime = require("response-time");
//
// ㅜ model
const {
  sequelize,
  User,
  AJYproduct,
  JBHproduct,
  JJWproduct,
  Like,
} = require("./model/index_AJJ");
//
// ㅜ router
const cart = require("./router/cart_router_AJJ");
const login = require("./router/login_router_AJJ");
const signUp = require("./router/signUp_router_AJJ");
const example = require("./router/example_router_AJJ");
const keyword = require("./router/keyword_router_AJJ");
const products = require("./router/products_router_AJJ");
const iconEvent = require("./router/iconEvent_router_AJJ");
const dailyCheck = require("./router/dailyCheck_router_AJJ");
//
// ㅜ controller
const addProductData = require("./controller/addProductData_AJJ");
//
// ㅜ server 연결
const app = express();
const server = app.listen(PORT, () => {
  log("localhost:", PORT);
});
const io = socketio(server);
//
// app.use(
//   responseTime((req, res, time) => {
//     log(req.mothod, req.url, time);
//   })
// );
//
// ㅜ session 설정
app.use(
  session({
    secret: process.env.JU_SECRET_KEY,
    //
    // ㅜ 저장하고 불러올 때 다시 저장할 지 여부
    resave: false,
    //
    // ㅜ 저장 시 초기화 여부
    saveUninitialized: true,
  })
);
//
// ㅜ 헤더에 쿠키 추가
app.use(cookie());
//
// ㅜ body-parser
app.use(express.urlencoded({ extended: false }));
//
// ㅜ html 렌더링에 뷰 엔진 설정
app.set("view engine", "html");
//
// ㅜ html의 뷰 엔진을 ejs 렌더링 방식으로 변경
app.engine("html", ejs.renderFile);
//
// ㅜ views 키 값에 렌더링할 파일들을 모아둔 폴더의 주소 저장
app.set("views", path.join(__dirname, "/view"));
//
// ㅜ 절대 경로 설정
app.use(express.static(__dirname));
app.use("/img", express.static(path.join(__dirname, "img_Jang")));
app.use("/img", express.static(path.join(__dirname, "/img_Ahn_Ju")));
//
// ㅜ 라우터의 요청 주소에 대한 설정
app.use("/dailyCheck", dailyCheck);
app.use("/dailyPoint", iconEvent);
app.use("/example", example);
app.use("/keyword", keyword);
app.use("/shop", products);
app.use("/cart", cart);
app.use("/", signUp);
app.use("/", login);
//

// ㅜ 서버 실행 시 MySQL 연동
sequelize
  .sync({ force: false })
  .then(() => log("AJJ's DB connection"))
  .catch((err) => log(err));
//
// ㅜ 메인 페이지
app.get("/", async (req, res) => {
  let userName = "";
  let errorCode = "";
  let userPoint = 0;
  let aa = "";

  jwt.verify(req.session.aT, process.env.JU_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      errorCode = "로그인을 해주세요";
      userName = "";
      delete req.session.email;
      delete req.session.name;
      delete req.session.aT;
      delete req.session.rT;
    } else if (decoded) {
      errorCode = "";
      aa = req.session.name;
      userName = req.session.name + "님 환영합니다.";
      userPoint = req.session.point;
      // console.log(err);
      errorCode = err;
    }
  });
  await AJYproduct.findOne({}).then(async (obj) => {
    //
    // ㅜ 저장된 상품 데이터가 하나도 없을 경우 넣기
    if (obj === null) await addProductData();
    res.render("main_AJJ", { data: { userName, userPoint, aa }, errorCode });
  });
});

app.get("/point", async (req,res) => {
  let id = null;
  let email = null;
  if (req.session.email) {
    email = req.session.email;
  }
  await User.findOne({ 
    where: { email: email }, 
    attributes: ["id"] 
  }).then(
    (obj) => {
      if (obj !== null){  
        id = obj.dataValues.id;
      }
    }
  );
  res.send({ id: id });
})

////////////////
// ㅜ 주영님 코드
let adminArray = new Array();
let userArray = new Array();

// 유저의 실시간 채팅
io.sockets.on("connection", async (socket) => {
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
    socket.join(data.name);
    // 유저 들어왔을 때 알림 이벤트 요청
    socket.emit("liveHi2", data);
    // 유저 들어오면 관리자 소켓아이디 통해서 옵션 추가 이벤트
    io.to(adminArray[0]).emit("addOption", data);
  });

  socket.on("change", (data) => {
    socket.join(data);
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

  socket.on("likeCheck", async (shopName, productIndex, userEmail) => {
    await Like.findAll({
      where: {
        user_id: userEmail,
        jbhproduct_num: productIndex,
      },
    })
      .then((data) => {
        if (data) {
          Like.destroy({
            where: {
              user_id: data[0].user_id,
              jbhproduct_num: data[0].jbhproduct_num,
            },
          });
        }
      })
      .catch((err) => {});
  });
  socket.on("likeInsert", async (shopName, productIndex, userEmail) => {
    let arr1;
    await User.findOne({
      where: {
        email: userEmail,
      },
    })
      .then((userData) => {
        JBHproduct.findOne({
          where: {
            name: shopName,
            id: productIndex,
          },
        })
          .then((jbhData) => {
            if (jbhData) {
              JBHproduct.update(
                {
                  like_count: jbhData.like_count + 1,
                },
                {
                  where: { id: jbhData.id, name: jbhData.name },
                }
              )
                .then(() => {
                  Like.findOrCreate({
                    where: {
                      user_id: userData.email,
                      jbhproduct_num: jbhData.id,
                      like_check: 1,
                    },
                    defaults: {
                      user_id: userData.email,
                      jbhproduct_num: jbhData.id,
                      like_check: 1,
                    },
                  })
                    .then((data) => {
                      console.log(1);
                    })
                    .catch((err) => {
                      console.log(2);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        if (arr1 == null) {
          JJWproduct.findOne({
            where: {
              name: shopName,
              id: productIndex,
            },
          })
            .then((jjwData) => {
              if (jjwData) {
                JJWproduct.update(
                  {
                    like_count: jjwData.like_count + 1,
                  },
                  {
                    where: { id: jjwData.id, name: jjwData.name },
                  }
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (arr1 == null) {
          AJYproduct.findOne({
            where: {
              name: shopName,
              id: productIndex,
            },
          })
            .then((ajyData) => {
              if (ajyData) {
                AJYproduct.update(
                  {
                    like_count: ajyData.like_count + 1,
                  },
                  {
                    where: { id: ajyData.id, name: ajyData.name },
                  }
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (arr1 == null) {
          return (arr1 = "셋다 없음");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
//
// 09.05.13 수정
