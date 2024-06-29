import express from 'express'
import { ledgercontroller } from './controller';

const router = express.Router()

router.get('/oneday', ledgercontroller.getLedgerLast1Days)
router.get('/sevendays', ledgercontroller.getLedgerLast7Days)
router.get('/onemonth', ledgercontroller.getLedgerLast30Days)

export default router;