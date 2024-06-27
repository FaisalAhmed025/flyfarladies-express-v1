import express from 'express'
import { reportControlerr } from './controller'
const router  = express.Router()
router.post('/tasks/fetchAndSendReport', reportControlerr.newUserReport)
router.post('/tasks/fetchAndSendPackagebookingReport', reportControlerr.newBookingReport)
router.post('/tasks/fetchAndSendPackageVisitorsReport', reportControlerr.newUpackageVisitorReport)
router.get('/last1dayuser', reportControlerr.getuserlast1day)
router.get('/last7dayuser', reportControlerr.getuserlast7day)
router.get('/last30dayuser', reportControlerr.getuserlast30day)
export default router;