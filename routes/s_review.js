const router = require("express").Router()
const review_controller = require("../Service/controller/s_review_controller");

/** 리뷰 등록
 * @swagger
 *
 * /api/review/add:
 *  post:
 *    summary: "리뷰 등록" 
 *    description: "POST 방식으로 리뷰를 등록한다."
 *    tags: [Review]
 *    requestBody:
 *      description: 리뷰 등록 유저 로그인 필수
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              b_id:
 *                type: string
 *                description: "책 id"
 * 
 *              r_review:
 *                type: string
 *                description: "내용 500"
 *             
 *    responses:
 *      "200":
 *        description: 리뷰등록 성공시 sueccess = true 실패시 sueccess = false 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sueccess:
 *                  type: boolean
 *                    
 */
 router.post("/add", review_controller.s_ReviewAdd);
 /** 리뷰삭제
  * @swagger
  *
  * /api/review/delete:
  *  delete:
  *    summary: "리뷰 삭제"
  *    description: "Delete 리뷰 삭제."
  *    tags: [Review]
  *    requestBody:
  *      description: 
  *      required: true
  *      content:
  *        application/x-www-form-urlencoded:
  *          schema:
  *            type: object
  *            properties:
  *              b_name:
  *                type: string
  *                description: "리뷰 삭제 할 책 이름"
  *    responses:
  *      "200":
  *        description:   sueccess = true 실패시 sueccess = false
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                sueccess:
  *                  type: boolean
  *                    
  */
 router.delete("/delete", review_controller.s_ReviewDelete);

 /** 리뷰 목록
 * @swagger
 *
 * /api/review/reviewList:
 *  get:
 *    summary: "리뷰 목록." 
 *    description: "모든 리뷰 검색"
 *    tags: [Review]
 *    responses:
 *      "200":
 *        description: 리뷰 목록.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                    
 */
router.get("/reviewList", review_controller.s_reviewList);
/** 리뷰 검색
  * @swagger
  * /api/review/search/{b_name}:
  *  get:
  *    summary: "리뷰 검색."
  *    description: "책에 대한 리뷰를 검색한다."
  *    tags: [Review]
  *    parameters:
  *      - in: path
  *        name: b_name
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
 router.get("/search/:b_name", review_controller.s_ReviewSearch);

 module.exports = router