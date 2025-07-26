import multer from "multer";
import fs from 'fs';


export const Multer = (
  destinationPath = "general") => {
    /* make sure that the folder exists */
  const destinationFolder = `assets/${destinationPath}`;
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }

  /* disk storage */
  const storage = multer.diskStorage({
    /* destination 'required' */
    destination: function (req, file, cb) {
      cb(null, destinationFolder);
    },
    /* filename 'optional' */
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "__" + file.originalname);
    },
  });
  const upload = multer({ storage });
  return upload;
};
