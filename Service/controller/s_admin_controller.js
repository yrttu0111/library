const admin_model = require('../model/admin_model');

module.exports = {
    async s_BookAdd(req,res){
//책 등록
        const { b_name, b_sub, b_writer, b_genre} = req.body;
        if(req.session.admin_auth == true){
            const a_id = req.session.admin_id;
            let [ result , error ] = await admin_model.m_BookAdd(b_name, b_sub, b_writer, b_genre, a_id);
        
            if(error){
                res.json( { error_message : error });
                return;
            }

        res.status(201);
        res.json("책 추가됨");
        }
        else{
            res.json({ error_message : "관리자 로그인 안됨." })
        }
    
    },
    async s_AdminAdd(req,res){
// 관리자 회원 가입
        const { a_id, a_name, a_level, a_password} = req.body;
        let [ result , error ] = await admin_model.m_AdminAdd(a_id, a_name, a_level, a_password);
        if(error){
            res.json( { error_message : error });
            return;
        }

        res.status(201);
        res.json(result);
    },
    async s_AdminLogin(req,res){
        //관리자 로그인
        const { id, password } = req.body;
        let result_data = { message : "" , success : false}
        if(req.session.admin_auth){
            result_data = { message : "이미 로그인 되어있음." , success : false}
        }
        
        let [result, search_err] = await admin_model.m_AdminLogin(id);

        if(result) {
            if (result[0].a_password != password){
                res.json( { error_message : "비밀번호가 틀렸습니다." });
                return;
            }
            
        }else {
            res.json( { error_message : "아이디가 없습니다." });
            return;
        }
        
        req.session.admin_auth = true; // auth 프로퍼티를 통해 로그인이 되었는지 확인.
        req.session.admin_id = id; // 세션에 유저 아이디값 저장.
        req.session.admin_password = password; // 비밀번호 저장.

        // 응답으로 전송하는 데이터에 로그인 성공값을 저장
        result_data.success = true;
        result_data.message = "로그인 성공";
        req.session.admin_id = result[0].a_id;
        res.status(201);
        res.json(result[0]);
        
    },
    async s_AdminLogout(req,res){
        // 관리자 로그아웃
        req.session.destroy(function(err){
            if(err){
                res.json({ success : false, message:"로그아웃 에러"});
            } else {
                res.json({ success : true,  message:"로그아웃 완료"});
            }
        });
    },
    async s_Overdue(req,res){
        // 연체된 대출 보기
        if(req.session.admin_auth == true){
            let [ result , error ] = await admin_model.m_Overdue();

            res.status(201);
            res.json(result);
        
        }
        else{
            res.json({ error_message : "관리자 로그인 안됨." })
        }
    
    },
    async s_rentList(req,res){
        // 대출중인 책 리스트
        if(req.session.admin_auth == true){
            let [ result , error ] = await admin_model.m_rentList();
            res.status(201);
            res.json(result);
        }
        else{
            res.json({ error_message : "관리자 로그인 안됨." })
        }
    
    },
}