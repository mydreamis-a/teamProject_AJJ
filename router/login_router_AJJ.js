const { User } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const session = require("express-session");

// router.use(
//   session({
//     secret: process.env.JU_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

router.post("/login", (req, res) => {
  let errorCode = "";
  const { email, password } = req.body;
  req.session.name = null;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      bcrypt.compare(password, user?.password, (err, same) => {
        if (same) {
          let aT = jwt.sign(
            {
              password: user.password,
              type: "JWT",
            },
            process.env.JU_ACCESS_TOKEN,
            {
              issuer: "주병현",
              expiresIn: "30s",
            }
          );
          let rT = jwt.sign(
            {
              password: user.password,
              type: "JWT",
            },
            process.env.JU_REFRESH_TOKEN,
            {
              issuer: "주병현",
              expiresIn: "30s",
            }
          );
          req.session.aT = aT;
          req.session.rT = rT;
          req.session.name = user.name;
          req.session.email = user.email;
          req.session.point = user.point;
          res.redirect("/");
        } else if (!same) {
          console.log(err + "1");
          errorCode = "아이디와 비밀번호가 정확하지 않습니다.";
          userName = "";
          res.render("main_AJJ", { errorCode });
          // res.redirect("/");
        }
      });
    })
    .catch((e) => {
      console.log(err);
      errorCode = "비밀번호 틀림";
      userName = "";
      res.render("main_AJJ", { userName, errorCode });
    });
});

module.exports = router;
