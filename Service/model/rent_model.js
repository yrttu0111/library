const user_db = require('./db/user_db');

module.exports = {
    async m_RentAdd(b_id, u_id) {
        //대여시간 마감 날짜 구하기
        let today = new Date(); 
        let start_rent = today.toLocaleDateString();
        let monthplus = new Date(today.setMonth(today.getMonth() + 1));
        let end_rent = monthplus.toLocaleDateString();

        let query1 = `insert into rent set start_rent = ?,end_rent = ? ,b_id = ? ,u_id = ? `;
        let data = [start_rent, end_rent, b_id, u_id];
        
        return await user_db.ReadDB(query1 , data);

    },

    async m_RentBook1(b_id) {
        let query2 = `update book set b_rent = '대여중' where b_id = ? `
        let data = [b_id];
        return await user_db.ReadDB(query2, data);
    },

    async m_RentBook2(b_id) {
        let query2 = `update book set b_rent = '대여 가능' where b_id = ? `
        let data = [b_id];
        return await user_db.ReadDB(query2, data);
    },

    async m_IsRent(b_id) {
        let query2 = `select b_rent from book where b_id = ? `
        let data = [b_id];
        return await user_db.ReadDB(query2, data);
    },

    async m_RentEnd(b_id, u_id) {
        let query = `delete from rent where b_id = ? and u_id = ? `
        let data = [b_id, u_id];
        return await user_db.ReadDB(query, data);
    },
    async m_RentCnt(b_id) {
        let query = `update book set rent_cnt = rent_cnt + 1  where b_id = ? `;
        let data = [b_id];
        return await user_db.ReadDB(query, data);
    },
}