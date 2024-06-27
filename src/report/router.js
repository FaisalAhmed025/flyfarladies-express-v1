import express from 'express'
import { reportControlerr } from './controller'
const router  = express.Router()
router.post('/tasks/fetchAndSendReport', reportControlerr.newUserReport)
router.post('/tasks/fetchAndSendPackagebookingReport', reportControlerr.newBookingReport)
router.post('/tasks/fetchAndSendPackageVisitorsReport', reportControlerr.newUpackageVisitorReport)
router.get('/last1dayuser', reportControlerr.getuserlast1day)
router.get('/last7dayuser', reportControlerr.getuserlast7day)
router.get('/last30dayuser', reportControlerr.getuserlast30day)
router.get('/last12hoursbooking', reportControlerr.newhalfBookingReport)
router.get('/last12hourspackagevisitor', reportControlerr.halfdaypackagevisitor)
router.get('/ledger/all', reportControlerr.AllLedger)
router.post('/holdbooking', reportControlerr.Allholdbooking)
router.post('/paidbooking', reportControlerr.paidbookingreport)
router.post('/firstinstallemntcomplted', reportControlerr.firstinsatllemntCompleted)
router.post('/secondinsatllemntCompleted', reportControlerr.secondinsatllemntCompleted)

export default router;