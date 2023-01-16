const router = require("express").Router()
const search_controller = require("../Service/controller/s_search_controller");

/** 책 검색
  * @swagger
  * /api/search/name/{name}:
  *  get:
  *    summary: "책 검색."
  *    description: "책 검색. like 사용-> 문자가 포함되는 모든 책 검색"
  *    tags: [Search]
  *    parameters:
  *      - in: path
  *        name: name
  *        required: true
  *        description: 책 이름
  *        schema:
  *          type: string
  *    responses:
  *      "200":
  *        description: 책 정보를 돌려준다.
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                user:
  *                  type: object
  *                  
  */
 router.get("/name/:name", search_controller.s_BookSearchName);

 /** 신간 도서
 * @swagger
 *
 * /api/search/newbook:
 *  get:
 *    summary: "신간 도서." 
 *    description: "최근 추가한 도서 top3"
 *    tags: [Search]
 *    responses:
 *      "200":
 *        description: 책 목록.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                    
 */
router.get("/newbook", search_controller.s_NewBookwList);
 /** 인기 도서
 * @swagger
 *
 * /api/search/bestbook:
 *  get:
 *    summary: "인기 도서." 
 *    description: "대여수가 가장 많은 도서 top3"
 *    tags: [Search]
 *    responses:
 *      "200":
 *        description: 책 목록.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                    
 */
 router.get("/bestbook", search_controller.s_BestBookwList);
 module.exports = router