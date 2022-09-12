const { log } = console;
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user_AJJ");
//
/////////////////////////////////////////////////////
/**
 * 로그인에 대한 토큰 만료 여부를 확인하는 미들웨어 함수
 */
module.exports = async function tokenVerify(req, res) {
    //
    let userName = "";
    let userPoint = "";
    let errorCode = "";
    //
    if (req.session.email !== undefined) {
        //
        let rT = undefined;
        const { aT, email } = req.session;
        log(aT)
        //
       await User.findOne({ where: { email: email }, attributes: ["refresh"] })
            .then(obj => {
                rT = obj.dataValues.refresh;
                //
                jwt.verify(aT, process.env.JU_ACCESS_TOKEN, (err, acc_decoded) => {
                    // log("1");
                    // ㅜ 액세스 토큰이 만료되었을 경우
                    if (err) {
                        log("a")
                        // ㅜ 동일한 세션에서 로그인한 경우
                        if (rT === req.session.rT) {
                            //
                            log("b")
                            jwt.verify(rT, process.env.JU_REFRESH_TOKEN, (err, ref_decoded) => {
                                //
                                // ㅜ 리프레스 토큰의 검증이 확인되었을 경우
                                if (!err) {
                                    log("c")
                                    const aT = jwt.sign(
                                        {
                                            userEmail: obj.email,
                                        },
                                        process.env.JU_ACCESS_TOKEN,
                                        {
                                            expiresIn: "60s",
                                        }
                                    )
                                    req.sesion.aT = aT;
                                    // return { userName, userPoint, errorCode };
                                };
                            });
                        }
                        else {
                            log("d")
                            errorCode = "로그인을 해주세요";
                            delete req.session.email;
                            delete req.session.name;
                            delete req.session.aT;
                            delete req.session.rT;
                            // return { userName, userPoint, errorCode };
                        };
                    }
                    // ㅜ 액세스 토큰의 검증이 확인되었을 경우
                    else {
                        log("e")
                        userName = req.session.name + "님 환영합니다.";
                        userPoint = req.session.point;
                        // return { userName, userPoint, errorCode };
                    };
                });
            })
    };
    // log("2");
    log("2", userName, userPoint, errorCode)
    return { userName, userPoint, errorCode };
};
// 09.08.07 수정