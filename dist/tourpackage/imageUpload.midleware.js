"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// define image type
var FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf"
};
var storage = _multer["default"].memoryStorage({
  destination: function destination(req, file, cb) {
    //console.log(file);
    //  console.log(file.mimetype);
    var isValid = FILE_TYPE_MAP[file.mimetype];
    var uploadError = new Error("invalid image type");
    if (isValid) uploadError = null;
    cb(uploadError, null);
  }
});
var upload = exports.upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});