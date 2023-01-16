const user_model = require('../model/user_model');

module.exports = {
    // 회원 중복
    async s_UserDuplicate(req, res) {
        const id = req.params.id;
        let [result, err] = await user_model.m_UserSearch(id);
        
        

        if (result.length > 0) {
            res.json({duplicated : true});
        } else {
            res.json({duplicated : false});
        }
    },
    async s_UserJoin(req,res){
        // 회원 가입
        const { id , password ,name , age , gender , phone_number, mail} = req.body;
        let [ result , error ] = await user_model.m_UserJoin( id , password ,name , age , gender , phone_number, mail);

        if(error){
            res.json( { error_message : error });
            return;
        }

        res.status(201);
        res.json("회원 가입 성공");
    },

    async s_UserSearch(req,res){
        if(req.session.auth){ // 로그인 했는지 체크.
            const id = req.params.id; // 전송 받은 id값 가져오기
            let [ result , err ] = await user_model.m_UserSearch(id); 
            res.json(result);
        } else {
            res.json({message : "로그인이 필요 합니다."});
        }


    },

    async s_UserInfoUpdate(req,res){
        // 회원 수정
        const {name , id  } = req.body;
        let [ result , err_message ] = await user_model.m_UserInfoUpdate(name,id);
        res.json(result);
    },

    async s_UserLeave(req,res){
        // 탈퇴
        const { id } = req.body;
        let [ result , err_message ] = await user_model.m_UserLeave(id);
        res.json(result);
    },
    async s_UserLogin(req,res){
        // 로그인
        const {id,password} = req.body;
        if(req.session.auth == true){
            let result_data = { message : "이미 로그인 되어있음." , success : false}
            res.json(result_data);
        }
        else{
        let [ result , error ] = await user_model.m_UserSearch(id);

        let result_data = { message : "로그인 실패 아이디 혹은 암호가 틀립니다." , success : false}

        if(result){
            if(result.length > 0){
                if( result[0].u_password == password ) {
                    // 로그인 성공시 세션에 데이터 저장.
                    req.session.auth = true; // auth 프로퍼티를 통해 로그인이 되었는지 확인.
                    req.session.user_id = id; // 세션에 유저 아이디값 저장.
                    req.session.password = password; // 비밀번호 저장.

                    // 응답으로 전송하는 데이터에 로그인 성공값을 저장
                    result_data.success = true;
                    result_data.message = "로그인 성공";
                }
            } 
        }

        res.json(result_data);
        }
    },
    async s_Logout(req,res){
        // 로그아웃 
        req.session.destroy(function(err){
            if(err){
                res.json({ success : false, message:"로그아웃 에러"});
            } else {
                res.json({ success : true,  message:"로그아웃 완료"});
            }
        });
    },

}