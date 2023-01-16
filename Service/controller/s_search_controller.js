const search_model = require('../model/search_model');

module.exports = {
    
    async s_BookSearchName(req,res){
        // 책 찾기
        const name = req.params.name;
        let [ result , err ] = await search_model.m_BookSearchName(name);
        res.json(result);
    },
    async s_NewBookwList(req,res){
        // 신간도서 3개
        let [ result , error ] = await search_model.m_NewBookwList();
        res.status(201);
        res.json(result);
        
    },
    async s_BestBookwList(req,res){
        // 인기도서 3개 
        let [ result , error ] = await search_model.m_BestBookwList();
        res.status(201);
        res.json(result);
        
    },
}
