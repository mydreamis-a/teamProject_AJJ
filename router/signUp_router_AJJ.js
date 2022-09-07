const { User } = require("../model/index_AJJ");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { log } = console;
//
router.post("/signUp", (req, res) => {
  //
  const errorCode = undefined;
  const { name, phone, email, password } = req.body;
  //
  bcrypt.hash(password, 10, (err, password) => {
    //
    if (err) log(err);
    else {
      User.findOrCreate({
        //
        where: {
          phone: phone,
          email: email,
        },
        defaults: {
          name: name,
          phone: phone,
          email: email,
          password: password,
        },
      })
        .then(() => {
          const userName = "회원 가입이 완료되었습니다";
          res.render("main_AJJ", { data: { userName }, errorCode });
        })
        .catch(() => {
          const userName = "입력하신 전화 번호 혹은 이메일이 이미 존재합니다. 회원 가입이 완료 되지 않았습니다.";
          res.render("main_AJJ", { data: { userName }, errorCode });
        });
    };
  });
});

module.exports = router;
