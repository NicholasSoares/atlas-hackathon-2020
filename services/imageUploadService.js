const multer = require("multer");
const multer_storage_cfg = require('../config/multerBucketSettings');
const path = require('path');

function getStorage(){
    return multer.diskStorage(multer_storage_cfg.production.imageUpload);
}

function getMulterInstance() {
    return multer({ storage: getStorage(), limits: {fileSize: 1000000}});
}

module.exports = {
    getMulterUploadInstance: () => {
        return getMulterInstance();
    },
    deleteImage: async (file_project_path) => {
        let filepath = path.join(__dirname + `/../${file_project_path}`);
        fs.unlinkSync(filepath);
    }
};