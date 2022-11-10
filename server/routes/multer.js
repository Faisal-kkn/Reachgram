import multer from 'multer'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, '../client/public/images');
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
    },
});

export const upload = multer({ storage });