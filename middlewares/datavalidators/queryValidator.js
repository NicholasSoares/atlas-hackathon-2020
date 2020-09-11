function normalizeQuery(query) {
    try{
        query.limit = 24;
        query.page = (query.page === undefined)? 1 : query.page;
        query.offset = (query.page > 1)? (query.limit)*((query.page-1)) : 0;

        try {
            if(query.search !== undefined){
                query.search = query.search.trim().replace(/[^\w\s]/g,'');
                if(query.search.length){
                    query.search = undefined;
                }
            }
        }
        catch (e) {
            query.search = undefined;
        }

        return query;
    }
    catch (e) {
        return {
            limit : 24,
            page : 1,
            offset : 0
        }
    }
}

module.exports = [
    async (req, res, next) => {
        req.query = normalizeQuery(req.query);
        next();
    }
];