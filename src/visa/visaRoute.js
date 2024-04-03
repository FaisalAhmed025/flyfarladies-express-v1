import express from "express";
import { visaController } from "./visaController";

const router = express.Router();
router.get("/get-visa-info", visaController.getVisaController);
router.get("/get-country-name", visaController.getCountryController);
router.get("/get-visa-type", visaController.getCountryTypeController);
export const visaRoutes = router;
