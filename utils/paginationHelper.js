const pagination = require('pagination');

module.exports = {
    makePagination: (prelink, currentPage, rowsPerPage, totalResults) =>{
        return new pagination.SearchPaginator({
            prelink: prelink,
            current: currentPage,
            rowsPerPage: rowsPerPage,
            totalResult: totalResults
        }).getPaginationData();
    }
};