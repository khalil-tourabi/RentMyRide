// upload.ts
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinaryConfig';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'car_images',
        allowedFormats: ['jpeg', 'png', 'gif', 'jpg'],
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 40000000 },
});

export default upload;
