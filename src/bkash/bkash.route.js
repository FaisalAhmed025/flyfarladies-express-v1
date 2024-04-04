

import express from 'express'
import { bkashController } from './bkash.controller'
const router = express.Router()

router.get('/gettoken', bkashController.generateToken)
router.post('/createpayment', bkashController.createPayment)
router.post('/refund', bkashController.refundAmount)
router.get('/bkash-query', bkashController.QueryPayment)
router.get('/bkash-search', bkashController.bkasSearch)
router.get('/callback', bkashController.callback)

export default router;