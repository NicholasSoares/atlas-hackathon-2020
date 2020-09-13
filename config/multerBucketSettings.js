const crypto = require('crypto');
const mime = require('mime');
const path = require('path');

module.exports = {
    development : {
        imageUpload : {
            destination: function (req, file, cb) {
                let filepath = path.join(__dirname + '/../public/images');
                cb(null, filepath)
            },
            filename: function (req, file, cb) {
                crypto.pseudoRandomBytes(16, function (err, raw) {
                    cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
                });
            },
            fileFilter: function (req, file, cb) {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
                    cb(null, true);
                }
                else {
                    return cb(new Error('Only image files are allowed!'));
                }
            }
        }
    },
    production : {
        imageUpload : {
            destination: function (req, file, cb) {
                let filepath = path.join(__dirname + '/../public/images');
                cb(null, filepath)
            },
            filename: function (req, file, cb) {
                crypto.pseudoRandomBytes(16, function (err, raw) {
                    cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
                });
            },
            fileFilter: function (req, file, cb) {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
                    cb(null, true);
                }
                else {
                    return cb(new Error('Only image files are allowed!'));
                }
            }
        }
    }
};