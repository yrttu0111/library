
const mysql = require('mysql2/promise'); // mysql 모듈 promise 방식으로 가져오기

const pool = mysql.createPool({
    host: '127.0.0.1',      // 데이터베이스 ip 주소
    port: 3306,             // mysql 포트 번호
    user: 'jaemin',           // 접속 아이디
    password: 'ASDasd123!',    // 접속 비밀번호
    database: 'library',   // 데이터베이스 이름 mysql은 스키마 이름
    waitForConnections: true,  // 풀에 여유 커넥션이 없는경우 대기 할 것인지 옵션
    connectionLimit: 10,    // 커넥션풀에 미리 생성할 커넥션 개수
    multipleStatements : true
});

module.exports = {
    async ReadDB(query , value){
        try {
            const connection = await pool.getConnection(async conn => conn);
            try {
                var [result , err] = await connection.query(query, value);
                return [result, err];
            } catch (err) {
                // 쿼리 실행중 에러가 발생하면 이부분으로 들어옴.
                console.log(err);
                console.log("Query Error");
                return [null, err];
            } finally {
                connection.release();
            }
        } catch (err) {
            // connection 가져올때 에러가 있다면 이부분으로 들어옴.
            console.log(err);
            console.log("Connection Error");
            return [null, err]
        }
    }
};
