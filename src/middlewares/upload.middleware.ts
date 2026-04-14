import fs from "fs";
import multer from "multer";
import path from "path";

import { env } from "../config/env";
import { AppError } from "../utils/app-error.util";

const productImageDirectory = path.resolve(process.cwd(), env.UPLOAD_DIR, "products");
fs.mkdirSync(productImageDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, productImageDirectory);
  },
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname) || ".jpg";
    callback(null, `${Date.now()}-${file.fieldname}${extension}`);
  }
});

const fileFilter: multer.Options["fileFilter"] = (_request, file, callback) => {
  if (!file.mimetype.startsWith("image/")) {
    callback(new AppError(400, "Only image files are allowed"));
    return;
  }

  callback(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter
});

export const singleProductImageUpload = upload.single("image");
