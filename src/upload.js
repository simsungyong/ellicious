import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import './env';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_BUCKET,
  secretAccessKey: process.env.AWS_BUCKET_SECRET,
  region: "ap-northeast-2"
});


const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "elliciouscontainer",
    metadata: function(req, file, cb) {
      console.log(file);
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString()+".jpg");
    }
  })
});


export const uploadMiddleware = upload.array("file",10);

export const uploadController = (req, res) => {
  const temp=[]
  req.files.forEach((element, i) => {
    temp[i] = element.location
  })
  res.json({temp});
};

