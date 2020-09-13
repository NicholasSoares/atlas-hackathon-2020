const imageUploadService = require('../services/imageUploadService');
const multer = require('multer');

module.exports = function(req, res, next) {
    let multerInstance = imageUploadService.getMulterUploadInstance();
    let upload = multerInstance.single('image');

    upload(req, res, async function (err) {
        try{
            if (err instanceof multer.MulterError) {
                next(err);
            } else if (err) {
                next(err);
            } else {
                next();
            }
        }
        catch (e) {
            next(e);
        }
    });
};