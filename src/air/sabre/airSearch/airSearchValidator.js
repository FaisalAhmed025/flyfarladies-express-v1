import { z } from "zod";

// Define the schema for segments
const segmentSchema = z.object({
  origin: z.string().length(3, {
    message: "Must be exaclty 3 characters long",
  }),
  destination: z.string().length(3, {
    message: "Must be exaclty 3 characters long",
  }),
  departureDate: z.string().date({ message: "Invalid date string!" }),
});
// Define the schema for vendor preferences
const vendorPrefSchema = z.object({
  vendorCode: z.string().length(3, {
    message: "Must be exaclty 3 characters long",
  }),
});
const cabinEnum = z.enum([
  "Business",
  "PremiumFirst",
  "PremiumBusiness",
  "PremiumEconomy",
]);
// Define the main schema
export const fareRequestSchema = z.object({
  adultCount: z
    .number()
    .int()
    .min(1, { message: "Minimum 1 passenger required" }),
  childCount: z.number().int().min(0),
  infantCount: z.number().int().min(0),
  segmentsList: z.array(segmentSchema),
  vendorPref: z.array(vendorPrefSchema),
  cabin: cabinEnum, // Assuming cabin is a non-empty string
  studentFare: z.boolean(),
  umrahFare: z.boolean(),
  seamanFare: z.boolean(),
});
