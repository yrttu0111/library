const review_model = require('../model/review_model');

module.exports = {
    async s_ReviewAdd(req,res){
        // 리뷰등록
        const{ b_id, r_review} = req.body;
        if(req.session.auth == true){
            const u_id = req.session.auth;
            let [ result , error ] = await review_model.m_ReviewAdd(b_id, r_review, u_id);
            res.status(201);
            res.json(result[0]);
        }
    },
    async s_reviewList(req,res){
        // 리뷰 리스트
        let [ result , error ] = await review_model.m_ReviewList();
        res.status(201);
        res.json(result);
        
    },
    async s_ReviewSearch(req,res){
        // 리뷰 찾기
        const b_name = req.params;
        const bookName = b_name.b_name;
        let [ result , error ] = await review_model.m_ReviewSearch(bookName);
        res.status(201);
        res.json(result);
        
    },
    async s_ReviewDelete(req,res){
        // 리뷰 지우기
        const { b_name } = req.body;
        let u_id = "";
            
        if(req.session.auth == true){
            u_id = req.session.user_id;
            let [ result , error ] = await review_model.m_ReviewDelete(b_name, u_id);
        
        }
        else{
                res.json("로그인이 되어있지 않습니다.");
            }
        
    },
}