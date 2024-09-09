import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        cb(null, `${timestamp}-${baseName}${ext}`);
    }
});

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Error: Images Only!'));
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 40000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

export default upload;