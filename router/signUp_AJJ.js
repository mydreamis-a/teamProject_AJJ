const {User} = require("../model/index_AJJ");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const productsDB = require("./productsDB_AJJ");

router.post("/signUp",(req,res)=>{
    const {name,phone,email,password} = req.body;
    bcrypt.hash(password,10,(err,data)=>{
      if(err){
        console.log(err);
      }
      else{
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
        }).then((e) => {
          console.log(e+"3");
          let userName = "회원가입이 완료되었습니다";
          let errorCode = "";
          productsDB();
          res.render("main_AJJ",{userName,errorCode});
        }).catch((e) => {
          console.log(e+"4");
          let userName = "이미 중복된 값이 있습니다";
          let errorCode = "";
          productsDB();
          res.render("main_AJJ",{userName,errorCode});
        });
      }
    })
  })

  module.exports = router;