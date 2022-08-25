const { log } = console;

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");
const ejs = require("ejs");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
  log("localhost:", PORT);
});

const io = socketio(server);

// ㅜ body-parser
app.use(express.urlencoded({ extended: false }));

// ㅜ html 렌더링에 뷰 엔진 설정
app.set("view engine", "html");

// ㅜ html의 뷰 엔진을 ejs 렌더링 방식으로 변경
app.engine("html", ejs.renderFile);

// ㅜ views 키 값에 렌더링할 파일들을 모아둔 폴더의 주소 저장
app.set("views", path.join(__dirname, "../view"));

// ㅜ 절대 경로 설정
app.use(express.static(path.join(__dirname, "..")));

app.use("/img", express.static(path.join(__dirname, "/img_Jang")));
app.use("/img", express.static(path.join(__dirname, "/img_Ahn_Ju")));

app.get("/", (req, res) => {
  res.render("main_AJJ");
});

// 유저의 실시간 채팅
io.sockets.on("connection", (socket) => {
    console.log("새로운 유저 : ", socket.id);
    // 유저의 전화상담
    socket.on("callChat", () => {
        socket.emit("callChat2", () => {
        });
    });

    // 유저의 실시간 상담
    socket.on("liveChat", () => {
        socket.emit("liveChat2", () => {
        });
    });

    // 관리자 or 유저 채팅
    socket.on("message", (data) => {
        if (!data.message) return;
        // console.log(data);
        io.emit("to-message", data);
    });
    
    // 상담하기 누르면 안녕하세요 띄우는거
    socket.on("liveHi", (data) => {
        console.log(data);
        socket.emit("liveHi2",data);
    });
});
