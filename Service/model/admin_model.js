const user_db = require('./db/user_db');


module.exports = {
    async m_BookAdd(b_name, b_sub, b_writer, b_genre, a_id) {
        let today = new Date(); 
        let AddDate = today.toLocaleDateString()
        let query = 'insert into book set b_name = ?, b_sub = ?, b_date = ? , b_writer = ? , b_genre = ?, a_id = ?';
        let data = [b_name, b_sub, AddDate, b_writer, b_genre, a_id];
        return await user_db.ReadDB(query, data);
    },
    async m_AdminAdd( a_id, a_name, a_level, a_password) {
        
        let query = 'insert into admin set a_id = ? , a_name = ? , a_level = ?, a_password = ?';
        let data = [a_id, a_name, a_level, a_password];
        return await user_db.ReadDB(query, data);
    },

    async m_AdminLogin(id) {
      
        let query = 'select  a_id ,a_name ,a_level, a_password from admin where a_id = ?';
        return await user_db.ReadDB(query,[id]);
    },
    async m_Overdue() {
        let query = `select rent.u_id, rent.b_id, STR_TO_DATE(rent.end_rent, '%Y. %m. %d.') as end_rent
        , STR_TO_DATE(NOW(), '%Y-%m-%d') as nowDate ,
        user_info.u_name, user_info.u_mail , user_info.u_phone_number
        from rent inner join user_info on user_info.u_id = rent.u_id
        where STR_TO_DATE(NOW(), '%Y-%m-%d') < STR_TO_DATE(rent.end_rent, '%Y. %m. %d.')`;
        let data = [];
        return await user_db.ReadDB(query, data);
    },
    async m_rentList() {
        let query = `select * from rent order by STR_TO_DATE(rent.start_rent, '%Y. %m. %d.')`;
        let data = [];
        return await user_db.ReadDB(query, data);
    },
}