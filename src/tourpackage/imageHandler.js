import {
  convertToWebP,
  deleteFile,
  deleteFolderRecursive,
  removeFileExtension,
} from "./folderDelete";
import { Storage } from "@google-cloud/storage";
import sharp from "sharp";
import httpStatus from "http-status";
import pool from "../database/db";
import ErrorResponse from "../errorHandler.js/errorResponse";

export const getCurrentUserInfo = async (req, res, next) =>
  await storeData(req, res, next, "user", "id");

export const handleMultipleImage = async (req, res, next) =>
  await MultipleImageHandler(req, res, next, 20);

export const storeMultipleImage = async (req, res, next) =>
  await storeData(req, res, next, "user", "id");

/*   common function for image handler */
async function saveOnGCP(req) {
  const uniqueSuffix = req.file.originalname.split(" ").join("-");
  req.file.originalname = `${uniqueSuffix}_${Date.now()}.pdf`;
  // Convert the image buffer to WebP format
  let webpBuffer = req.file.buffer;
  if (req.file.mimetype !== "application/pdf") {
    webpBuffer = await sharp(webpBuffer).webp().toBuffer();
    // Replace req.file values with the WebP buffer
    req.file.buffer = webpBuffer;
    req.file.mimetype = "image/webp";

    req.file.originalname = `${uniqueSuffix}_${Date.now()}.webp`;
    // If you need to set an extension, you can do so here
    req.file.extension = "webp";
  }

  const storage = new Storage({
    projectId: process.env.PROJECTID,
    keyFilename: "key.json",
  });
  // console.log(env.BUCKET)
  const bucket = storage.bucket("b2bnodeimages");
  const fileData = bucket.file(req.file.originalname);
  await fileData.save(req.file.buffer, {
    contentType: req.file.mimetype,
    public: true, // Make the file publicly accessible
  });

  // Get the publicly accessible URL of the uploaded file
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileData.name}`;
  req.imageLink = publicUrl;
  //console.log(req.imageLink);
  //console.log('berofe undefine')
  return publicUrl;
}
/* end of common function */
//   for single image handle
export const imageHandler = async (req, res, next) => {
  try {
    if (!req.file)
      return next(new ErrorResponse("Select file", httpStatus.BAD_REQUEST));
    // get the image file name
    // console.log(req.file);
    req.publicImageLink = await saveOnGCP(req);
    if (!saveOnGCP)
      return next(
        new ErrorResponse("failed to save image", httpStatus.BAD_REQUEST)
      );
    next();
  } catch (err) {
    console.log(err);

    await deleteImageFromURL(req.imageLink);
    next(err);
  }
};

export const optionalImage = async (req, res, next) => {
  try {
    if (!req.file) {
      //  delete req.url
      return next();
    } else {
      await imageHandler(req, res, next);
      // next()
    }
  } catch (err) {
    next(err);
  }
};

export const imageHandlerUpdate = async (req, res, next) => {
  if (!req.file) {
    //  delete req.url
    return next();
  }
  // Check if req.file is defined
  if (req.file) {
    // File upload is available
    // Get the image file name
    req.publicImageLink = await saveOnGCP(req);
    // Get base URL of the server

    // Remove file extension
    const output = req.publicImageLink;
    // console.log(output);
  }

  // Continue with the next middleware even if req.file is not found
  next();
};
//delete image
export async function deleteImageFromURL(url) {
  try {
    if (!url) {
      console.error("Invalid URL: ", url);
      return;
    }
    const parsedUrl = new URL(url);
    const bucketName = parsedUrl.hostname.split(".")[0];
    const pathSegments = decodeURIComponent(parsedUrl.pathname).split("/");
    const objectName = pathSegments[pathSegments.length - 1]; // Get the last segment
    console.table({ bucketName, objectName });
    const storage = new Storage({
      projectId: process.env.gcp.project_id,
      keyFilename: "key.json",
    });
    await storage.bucket(process.env.gcp.bucket).file(objectName).delete();
    // console.log(`Image deleted: gs://${process.env..gcp.bucket}/${objectName}`);
  } catch (error) {
    console.error(`Error deleting image: ${error}`);
  }
}
export const storeData = async (req, res, next, table, id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM ${table} WHERE ${id}=?`,
      [req.user.id]
    );
    //console.log(rows[0]);
    req.data = rows[0];
    // console.log(req.data);
    connection.release();
    next();
  } catch (err) {
    // if a single file
    req.image && deleteFile(req.image);
    // if multiple files
    if (req.images) {
      for (const imagePath of req.images) {
        deleteFile(imagePath);
      }
    }
    next(err);
  }
};
export const MultipleImageHandler = async (req, res, next, imageNumber) => {
  try {
    //console.log(imageNumber);
    if (!req.files) {
      return next(
        new ErrorResponse(
          `Must need ${imageNumber} images`,
          httpStatus.BAD_REQUEST
        )
      );
    }

    const images = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      //  console.log( file)
      // console.log(file)
      if (!file) {
        continue;
      }

      //  let image;
      const uniqueSuffix = file.originalname.split(" ").join("-");
      file.originalname = `${uniqueSuffix}_${Date.now()}.pdf`;
      // Convert the image buffer to WebP format
      let webpBuffer = file.buffer;
      if (file.mimetype !== "application/pdf") {
        await sharp(file.buffer).webp().toBuffer();
        // Replace req.file values with the WebP buffer
        file.buffer = webpBuffer;
        file.mimetype = "image/webp";

        file.originalname = `${uniqueSuffix}_${Date.now()}.webp`;
        // If you need to set an extension, you can do so here
        file.extension = "webp";
      }

      //  console.log('err')

      // const fileName = req.file.filename;

      const storage = new Storage({
        projectId: process.env.PROJECTID,
        keyFilename: "key.json",
      });
      // console.log(env.BUCKET)
      const bucket = storage.bucket("b2bnodeimages");
      //  console.log(bucket);
      const fileData = bucket.file(file.originalname);
      await fileData.save(file.buffer, {
        contentType: file.mimetype,
        public: true, // Make the file publicly accessible
      });

      // Get the publicly accessible URL of the uploaded file
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileData.name}`;
      images.push(publicUrl);
    }

    req.images = images;
    // req.urls = urls;
    next();
  } catch (err) {
    console.log(err);
    if (req.images) {
      for (let i = 0; i < req.images.length; i++) {
        await deleteImageFromURL(req.images[i]);
      }
    }
    next(err);
  }
};

export const handleSpecificImage = async (req, res, next) => {
  try {
    //if (req.files.length !== 2) next(new ErrorResponse('You must specify'))
    //console.log(req.files);
    const { personal_image, passport_copy } = req.files;
    if (!personal_image || !passport_copy)
      return next(
        new ErrorResponse(
          "You must specify one profile pic and one nid copy",
          httpStatus.FORBIDDEN
        )
      );

    if (personal_image.length !== 1 || passport_copy.length !== 1) {
      return next(
        new ErrorResponse(
          "You must specify one profile pic and one nid copy",
          httpStatus.FORBIDDEN
        )
      );
    }

    //console.log(profilePic[0], nidCopy[0])

    // use in saveGCP file
    req.file = personal_image[0];
    req.personal_image = await saveOnGCP(req);
    req.file = passport_copy[0];
    req.passport_copy = await saveOnGCP(req);
    next();
  } catch (err) {
    next(err);
  }
};

export const handlePassportVisa = async (req, res, next) => {
  try {
    //if (req.files.length !== 2) next(new ErrorResponse('You must specify'))

    const { passportCopy, visaCopy } = req.files;
    if (!visaCopy)
      return next(
        new ErrorResponse(
          "You must specify one passport copy and one visa copy",
          httpStatus.FORBIDDEN
        )
      );
    if (visaCopy.length === 0) {
      return next(
        new ErrorResponse("You must upload visa copy", httpStatus.FORBIDDEN)
      );
    }

    // use in saveGCP file
    req.file = passportCopy[0];
    req.passportCopy = await saveOnGCP(req);
    req.file = visaCopy[0];
    req.visaCopy = await saveOnGCP(req);
    next();
  } catch (err) {
    next(err);
  }
};
