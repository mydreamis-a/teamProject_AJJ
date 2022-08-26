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
let adminArray = new Array();
let userArray = new Array();

// 유저의 실시간 채팅
io.sockets.on("connection", (socket) => {
    
    // 유저의 전화상담
    socket.on("callChat", () => {
        socket.emit("callChat2", () => {
        });
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
        socket.emit("liveHi2",data);
        // 유저 들어오면 관리자 소켓아이디 통해서 옵션 추가 이벤트
        io.to(adminArray[0]).emit("addOption", data);
    });

    socket.on("aa", (data) => {
        socket.join(data);
        io.to(data).emit("message",data);
    });
    // 관리자가 로그인하면 관리자 소켓을 배열 첫번째에 담는다
    socket.on("admin", () => {
        adminArray.push(socket.id);
    });

    socket.on("message", (data) => {
        if (!data.message) return;
        // 관리자한테 보내는 메세지
        io.to(adminArray[0]).emit("adminChat",data);
        // 자기 자신에게 보내는 소세지
        socket.emit("usersChat",data);
    });

    socket.on("adminmessage", (data) => {
        if (!data.message) return;
        // 관리자한테 보내는 메세지
        io.to(data.name).emit("usersChat",{name : '관리자', message : data.message});
        // 자기 자신에게 보내는 소세지
        //socket.emit("usersChat",data);
    });


});