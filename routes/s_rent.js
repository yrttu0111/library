const router = require("express").Router()
const rent_controller = require("../Service/controller/s_rent_controller");
/** 대여 등록
 * @swagger
 * /api/rent/add:
 *  post:
 *    summary: "대여 등록" 
 *    description: "POST 방식으로 대여 등록한다."
 *    tags: [Rent]
 *    requestBody:
 *      description: 책등록
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              b_id:
 *                  type: string
 *                  description : "책 아이디"
 *              
 *              
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
 *                    
 */
 router.post("/add", rent_controller.s_RentAdd);

 /** 반납
  * @swagger
  *
  * /api/rent/end:
  *  delete:
  *    summary: "대여 삭제"
  *    description: "Delete 대여 삭제."
  *    tags: [Rent]
  *    requestBody:
  *      description: 
  *      required: true
  *      content:
  *        application/x-www-form-urlencoded:
  *          schema:
  *            type: object
  *            properties:
  *              b_id:
  *                type: string
  *                description: "반납할 책 id"
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
 router.delete("/end", rent_controller.s_RentEnd);




 module.exports = router