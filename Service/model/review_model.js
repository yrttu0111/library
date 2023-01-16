const user_db = require('./db/user_db');

module.exports = {
    async m_ReviewAdd(b_id,r_review, u_id) {
        let today = new Date(); 
        let r_date = today.toLocaleString();
        

        let query = `insert into review set r_date = ?, r_review = ?, b_id = ? ,u_id = ? `;
        let data = [r_date, r_review, b_id, u_id];
        
        return await user_db.ReadDB(query , data);

    },

    async m_ReviewList() {
        

        let query = `select book.b_name, book.b_id, review.r_review, 
        review.r_date, review.u_id
        from book  inner join review 
        on book.b_id = review.b_id
        order by r_date desc`;
        let data = [];
        
        return await user_db.ReadDB(query , data);

    },

    async m_ReviewSearch(b_name) {
        
        let query = `select book.*, review.r_review, 
        review.r_date, review.u_id
        from book  inner join review 
        on book.b_id = review.b_id
        where b_name = ?`;
        let data = [b_name];
        return await user_db.ReadDB(query, data);
    },
    async m_ReviewDelete(b_name, u_id) {
        
        let query = `delete from review where b_name = ? and u_id =?` ;
        let data = [b_name, u_id];
        return await user_db.ReadDB(query, data);
    },
}