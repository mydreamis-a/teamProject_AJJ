const { User } = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      bcrypt.compare(password, user?.password, (err,same) => {
        if (same) {
          let aT = jwt.sign(
            {
              password: user.password,
              type: "JWT",
            },
            process.env.JU_ACCESS_TOKEN,
            {
              issuer: "주병현",
              expiresIn: "15s",
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
              expiresIn: "15s",
            }
          );
          req.session.aT = aT;
          req.session.rT = rT;
          req.session.name = user.name;
          req.session.email = user.email;
          req.session.point = user.point;
          res.redirect("/");
        } else if (err) {
          console.log(err + "1");
          errorCode = "계정없음";
          userName = "";
          res.redirect("/");
        }
      });
    })
    .catch((e) => {
      console.log(err + "2");
      errorCode = "비밀번호 틀림";
      userName = "";
      res.render("main_AJJ", { userName, errorCode });
    });
});


module.exports = router;
