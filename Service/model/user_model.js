const user_db = require('./db/user_db');


module.exports = {

    async m_UserJoin(id , password ,name , age , gender , phone_number, mail) {
        // name = 길동 , age = 20 , gender = 남 , id = dong , password = dong
        // 커넥션 풀에서 커넥션 가져오기
        
        /** 생년 월일 값을 추가. brithday */
        let query = `insert into user_info set u_id = ? , 
        u_password = ? ,u_name = ? , u_age = ? , u_gender = ? , u_phone_number = ?, u_mail = ?`;
        let data = [id , password ,name , age , gender , phone_number, mail];
        return await user_db.ReadDB(query, data);
    },

    async m_UserSearch(id) {
        let query = `select  u_name ,u_gender ,u_id ,
        u_password , u_mail, u_phone_number, u_age from user_info where u_id = ?`;
        return await user_db.ReadDB(query,[id]);
    },

    async m_UserInfoUpdate(name, gender, id, change_mail,change_phone_number,change_age) {
// name = 길동 , age = 20 , gender = 남 , id = dong , password = dong
        // 커넥션 풀에서 커넥션 가져오기
        
        /** 생년 월일 값을 추가. brithday */
        let query = `update user_info set u_name = ? , u_gender = ? , 
        u_mail = ? , u_phone_number = ? , u_age = ? u_where id = ?`;
        let data = [name, gender, change_mail,change_phone_number,change_age, id];
        return await user_db.ReadDB(query, data);
        
    },

    async m_UserLeave(id,password) {
        let query = 'delete from user_info where u_id = ? and u_password = ?';
        let data = [id, password];
        return await user_db.ReadDB(query, data);


    },

    async m_GetUserList() {
        let query = "select * from user_info "
        return await user_db.ReadDB(query,[id]);
        
    },


}

