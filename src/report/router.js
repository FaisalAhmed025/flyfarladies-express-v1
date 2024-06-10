import express from 'express'
import { reportControlerr } from './controller'
const router  = express.Router()

router.post('/tasks/fetchAndSendReport', reportControlerr.newUserReport)
router.post('/tasks/fetchAndSendPackagebookingReport', reportControlerr.newBookingReport)
router.post('/tasks/fetchAndSendPackageVisitorsReport', reportControlerr.newUpackageVisitorReport)

export default router;