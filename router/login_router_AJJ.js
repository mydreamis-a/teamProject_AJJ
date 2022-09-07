const { User } = require("../model/index_AJJ");
const schedule = require("node-schedule");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { log } = console;
//
router.post("/login", (req, res) => {
  //
  let userName = undefined;
  let errorCode = undefined;
  const { email, password } = req.body;
  //
  User.findOne({ where: { email: email } })
    .then((obj) => {
      //
      if (obj === null) {
        errorCode = "없는 이메일입니다.";
        res.render("main_AJJ", { errorCode });
        return;
      }
      //
      bcrypt.compare(password, obj.password, (err, same) => {
        if (err) {
          log(err);
          return;
        }
        if (!same) {
          //
          userName = undefined;
          errorCode = "비밀번호가 정확하지 않습니다.";
          res.render("main_AJJ", { errorCode });
          return;
        }
        //
        else {
          const aT = jwt.sign(
            {
              userEmail: obj.email,
            },
            process.env.JU_ACCESS_TOKEN,
            {
              expiresIn: "5s",
            }
          );
          const rT = jwt.sign(
            {
              userEmail: obj.email,
            },
            process.env.JU_REFRESH_TOKEN,
            {
              expiresIn: "60s",
            }
          );
          req.session.aT = aT;
          req.session.name = obj.name;
          req.session.email = obj.email;
          req.session.point = obj.point;
          //
          User.update({ refresh: rT }, { where: { email: email } })
            .then(() => {
              const loginLimit = new Date();
              loginLimit.setSeconds(loginLimit.getSeconds() + 60);
              //
              const autoLogout = schedule.scheduleJob(loginLimit, () => {
                //
                log("logout", loginLimit);
                res.redirect("/");
              })
              res.redirect("/");
            })
        }
      })
    })
});

module.exports = router;
