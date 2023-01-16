const router = require("express").Router()
const admin_controller = require("../Service/controller/s_admin_controller");

/** 책등록 
 * @swagger
 * /api/admin/book/add:
 *  post:
 *    summary: "책등록 관리자"  
 *    description: "POST 방식으로 책을 등록한다. 로그인 필수"
 *    tags: [Admin]
 *    requestBody:
 *      description: 책등록
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              b_name:
 *                  type: string
 *                  description : "책 이름"
 *              b_sub:
 *                  type: string
 *                  description : "책 설명"
 *              
 *              b_writer:
 *                  type: string
 *                  description : "작가"
 *              b_genre:
 *                  type: string
 *                  description : "장르"
 *              
 *    responses:
 *      "200":
 *        description: 책 등록 성공시 sueccess = true 실패시 sueccess = false 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sueccess:
 *                  type: boolean
 *      "409":

 */
 router.post("/book/add", admin_controller.s_BookAdd);

 /** 관리자 등록
 * @swagger
 * /api/admin/add:
 *  post:
 *    summary: "관리자 등록" 
 *    description: "POST 방식으로 관리자를 등록한다."
 *    tags: [Admin]
 *    requestBody:
 *      description: 관리자 등록 
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              a_id:
 *                  type: string
 *                  description : "관리자 id"
 *              a_name:
 *                  type: string
 *                  description : "관리자 이름"
 *              a_level:
 *                  type: string
 *                  description : "관리 레벨"
 *              a_password:
 *                  type: string
 *                  description : "관리자 비밀번호"
 *              
 *    responses:
 *      "200":
 *        description: 아이디 등록 성공시 sueccess = true 실패시 sueccess = false 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sueccess:
 *                  type: boolean
 *                    
 */
  router.post("/add", admin_controller.s_AdminAdd);

  /** 관리자 로그인
 * @swagger
 * /api/admin/login:
 *  post:
 *    summary: "관리자 로그인" 
 *    description: "POST 방식으로 관리자 로그인 ."
 *    tags: [Admin]
 *    requestBody:
 *      description: 관리자 로그인 
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                  type: string
 *                  description : "id"
 *              password:
 *                  type: string
 *                  description : "비밀번호"
 *              
 *              
 *    responses:
 *      "200":
 *        description: 로그인 성공시 sueccess = true 실패시 sueccess = false 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sueccess:
 *                  type: boolean         
 */
 router.post("/login", admin_controller.s_AdminLogin);

 /**관리자 로그 아웃
 * @swagger
 *
 * /api/admin/logout:
 *  delete:
 *    summary: "로그 아웃" 
 *    description: "관리자 계정 로그 아웃"
 *    tags: [Admin]
 *    responses:
 *      "200":
 *        description: 로그 아웃.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                    
 */
router.delete("/logout", admin_controller.s_AdminLogout);
/** 대여 정보 
 * @swagger
 *
 * /api/admin/rentList:
 *  get:
 *    summary: "대여 정보." 
 *    description: "대여 중인 목록을 보여준다."
 *    tags: [Admin]
 *    responses:
 *      "200":
 *        description: 대여 정보.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                    
 */

router.get("/rentList", admin_controller.s_rentList);
 
/** 연체된 대여 검색
  * @swagger
  * /api/admin/overdue:
  *  get:
  *    summary: "연체자 목록."
  *    description: "연체자 목록"
  *    tags: [Admin]
  *    responses:
  *     "200":
  *       description: 연체자 목록.
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               success:
  *                 type: boolean
  *                 
  */
router.get("/overdue", admin_controller.s_Overdue);

 module.exports = router;