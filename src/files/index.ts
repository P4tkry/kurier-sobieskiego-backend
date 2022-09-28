import express, {Request, Response} from "express";
import multer from "multer";
import accessGuard from "../accessGuard";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        if(file.mimetype === "image/png")
            return cb(null, `${Date.now()}.png`);
        if(file.mimetype === "image/jpg")
            return cb(null, `${Date.now()}.jpg`);
        if(file.mimetype === "image/jpeg")
            return cb(null, `${Date.now()}.jpeg`);
        if(file.mimetype === "image/svg+xml")
            return cb(null, `${Date.now()}.svg`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/svg+xml") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg .jpeg and .svg format allowed!'));
        }
    }
});

const router = express.Router();

router.post('/', accessGuard, upload.single('file'), async (req: Request &{file: any}, res: Response)=>{
    return res.send({name: req.file?.filename});
})

router.use(express.static(path.join(__dirname, '../../uploads')));

export default router;