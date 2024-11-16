import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + file.originalname);
  },
});


const allowedFileType=["image/jpeg","image/jpg","image/png"]

const fileFilter=(req,file,cb)=>{
    if(!allowedFileType.includes(file.mimetype)){
        const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE",file.fieldname)
        error.message="Invalid file type, only JPEG,JPG and PNG allowed"
        return cb(error,false)
    }
  cb(null,true)
}

const upload = multer({
  storage,
  fileFilter,
  limits:{
    fileSize:1000000
  }
});


export default upload