// multer-storage-cloudinary.d.ts
declare module 'multer-storage-cloudinary' {
    import { CloudinaryOptions } from 'cloudinary';
    import { StorageEngine } from 'multer';

    export interface CloudinaryStorageOptions {
        cloudinary: CloudinaryOptions;
        params?: {
            folder?: string;
            allowedFormats?: string[];
            public_id?: string | ((req: any, file: any) => string);
            // Add any other properties you may need
        };
    }

    export class CloudinaryStorage implements StorageEngine {
        constructor(options: CloudinaryStorageOptions);
        _handleFile(req: any, file: any, cb: (error: any, info?: any) => void): void;
        _removeFile(req: any, file: any, cb: (error: any) => void): void;
    }

    export default function multerStorage(options: CloudinaryStorageOptions): StorageEngine;
}
