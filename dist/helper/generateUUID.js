"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUUID = generateUUID;
var _uuid = require("uuid");
function generateUUID() {
  var uuid = (0, _uuid.v4)();
  // Remove hyphens and convert to lowercase
  return uuid.replace(/-/g, "").toLowerCase();
}