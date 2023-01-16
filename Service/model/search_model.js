const user_db = require('./db/user_db');

module.exports = {
    async m_BookSearchName(name) {
        name = '%'+name+'%';
        let query = `select * from book where b_name like ?`;
        let data = [name];
        return await user_db.ReadDB(query, data);
    },
    async m_NewBookwList() {
        let query = `select * from book order by STR_TO_DATE(book.b_date, '%Y. %m. %d.') 
        desc limit 0, 3 `;
        let data = [];
        return await user_db.ReadDB(query, data);
    },
    async m_BestBookwList(name) {
        let query = `select * from book order by rent_cnt 
        desc limit 0, 3 `
        let data = [name];
        return await user_db.ReadDB(query, data);
    },
    
}