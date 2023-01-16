const rent_model = require('../model/rent_model');

module.exports = {
    async s_RentAdd(req,res){
        //대여 등록
        const { b_id } = req.body;
        let u_id = ""
        let [ result_is , error ] = await rent_model.m_IsRent(b_id);
        if(result_is[0].b_rent == '대여 가능'){
            
            if(req.session.auth == true){
                u_id = req.session.user_id;
                let [ result , error ] = await rent_model.m_RentAdd(b_id, u_id);
                if(result){ 
                    // 대여상태 바꾸기
                    let [ result2 , error2 ] = await rent_model.m_RentBook1(b_id, u_id);
                    // 인기도서 선정을 위한 대여 횟수
                    let [ result3 , error3 ] = await rent_model.m_RentCnt(b_id);
                }
                res.status(201);
                res.json(result[0]);
            }
        }
        else{
            res.json("이미 대여중입니다.");
        }
    },
    async s_RentEnd(req,res){
        // 반납
        const { b_id } = req.body;
        let u_id = ""
        let [ result_is , error ] = await rent_model.m_IsRent(b_id);
        if(result_is[0].b_rent == '대여중'){
            
            if(req.session.auth == true){
                u_id = req.session.user_id;
                let [ result , error ] = await rent_model.m_RentEnd(b_id, u_id);
                if(result){ 
                    let [ result2 , error2 ] = await rent_model.m_RentBook2(b_id, u_id);
                    res.status(201);
                    res.json(result2[0]);
                }
            }
            else{
                res.json("로그인이 되어있지 않습니다.");
            }
        }
        else{
            res.json("대여중이 아닙니다.");
        }
    },
}