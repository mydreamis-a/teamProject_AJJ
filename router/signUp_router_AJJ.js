const { User } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
router.post("/signUp", (req, res) => {
  const { name, phone, email, password } = req.body;
  bcrypt.hash(password, 10, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      User.findOrCreate({
        where: {
          phone: phone,
          email: email,
        },
        defaults: {
          name: name,
          phone: phone,
          email: email,
          password: data,
        },
      })
        .then((e) => {
          let userName = "회원가입이 완료되었습니다";
          let errorCode = "";
          res.render("main_AJJ", { data: { userName }, errorCode });
        })
        .catch((e) => {
          console.log(err);
          let userName = "이미 중복된 값이 있습니다";
          let errorCode = "";
          res.render("main_AJJ", { data: { userName }, errorCode });
        });
    }
  });
});

module.exports = router;
