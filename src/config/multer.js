const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (!allowedMimes.includes(file.mimetype)) {
        return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));
    }
    return cb(null, true);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', 'public', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage, fileFilter: fileFilter});

module.exports = upload;