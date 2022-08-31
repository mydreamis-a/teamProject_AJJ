const { Op } = require("sequelize");
const { Cart } = require("../model/index_AJJ");
/**
 * 장바구니 DB에서 장바구니에 담은 총 수량을 반환하는 함수
 * @param {*} res 
 */
module.exports = function cartListCount(res) {
    // ㅜ 비회원일 경우
    return Cart.sum("product_count", { where: { user_id: { [Op.is]: null } } })
        //
        .then(value => {
            if (value !== null) return value;
            else return 0;
        });
};
<<<<<<< HEAD

// 08.29.11 수정
=======
//
// 09.01.08 수정
>>>>>>> 3bca3fb (정렬 기능 최적화 구현 완료)
