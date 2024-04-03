

import express from 'express'
import { bkashController } from './bkash.controller'
const router = express.Router()

router.get('/gettoken', bkashController.generateToken)
router.post('/createpayment', bkashController.createPayment)
router.post('/refund', bkashController.refundAmount)
router.get('/checkout/status/:paymentID', bkashController.QueryPayment)
router.get('/callback', bkashController.callback)

export default router;