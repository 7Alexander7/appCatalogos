const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const newFilename = file.fieldname + '-' + uniqueSuffix + extension;
        cb(null, newFilename);
        return newFilename;
    }
});

const upload = multer({ storage: storage });

module.exports = (app) => {
    app.post('/api/subirImagen', upload.single('image'), (req, res) => {
        const newFilename = req.file.filename;
        console.log(newFilename)

        res.status(201).json({
            success: true,
            nombre: newFilename
        })
    });
}
