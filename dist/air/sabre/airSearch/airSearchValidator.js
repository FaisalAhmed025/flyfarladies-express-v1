"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fareRequestSchema = void 0;
var _zod = require("zod");
// Define the schema for segments
var segmentSchema = _zod.z.object({
  origin: _zod.z.string().length(3, {
    message: "Must be exaclty 3 characters long"
  }),
  destination: _zod.z.string().length(3, {
    message: "Must be exaclty 3 characters long"
  }),
  departureDate: _zod.z.date({
    message: "Invalid date string!"
  })
});
// Define the schema for vendor preferences
var vendorPrefSchema = _zod.z.object({
  vendorCode: _zod.z.string().length(3, {
    message: "Must be exaclty 3 characters long"
  })
});
var cabinEnum = _zod.z["enum"](["Business", "PremiumFirst", "PremiumBusiness", "PremiumEconomy"]);
// Define the main schema
var fareRequestSchema = exports.fareRequestSchema = _zod.z.object({
  adultCount: _zod.z.number()["int"]().min(1, {
    message: "Minimum 1 passenger required"
  }),
  childCount: _zod.z.number()["int"]().min(0),
  infantCount: _zod.z.number()["int"]().min(0),
  segmentsList: _zod.z.array(segmentSchema),
  vendorPref: _zod.z.array(vendorPrefSchema),
  cabin: cabinEnum,
  // Assuming cabin is a non-empty string
  studentFare: _zod.z["boolean"](),
  umrahFare: _zod.z["boolean"](),
  seamanFare: _zod.z["boolean"]()
});