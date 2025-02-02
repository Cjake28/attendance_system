import multer from 'multer';

const storage = multer.memoryStorage(); // Stores files in memory as buffer
const upload = multer({ storage });

export default upload;
