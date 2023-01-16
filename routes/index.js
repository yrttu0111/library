const router = require("express").Router()
const user = require('./s_user');
const admin = require('./s_admin');
const Search = require('./s_search');
const rent = require('./s_rent');
const review = require('./s_review');
router.get('/', function(req, res) {
    res.render('index.ejs', { title_text: '도서관 시스템!' });
  });
// 스웨거 문서 라우터


/**
 * @swagger
 * tags:
 *   name: User
 *   description: 회원 정보 관리
 */
 router.use("/user", user)
/**
  * @swagger
  * tags:
  *   name: Admin
  *   description: 책 정보 관리
  */
 router.use("/admin", admin)

/**
  * @swagger
  * tags:
  *   name: Search
  *   description: 책 검색 
  */
router.use("/Search", Search)
/**
  * @swagger
  * tags:
  *   name: Rent
  *   description: 책 대여 
  */
 router.use("/rent", rent)
/**
  * @swagger
  * tags:
  *   name: Review
  *   description:  리뷰
  */
 router.use("/review", review)
module.exports = router