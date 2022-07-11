const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });
router.post('/', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

module.exports = router;
