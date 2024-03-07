import multer from 'multer';

// define image type
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf',
};

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    //  console.log(file.mimetype);
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');
    if (isValid) uploadError = null;
    cb(uploadError, null);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
