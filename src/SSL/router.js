import express from 'express'
import { sslpaymentController } from './controller';
const router  = express.Router()
router.get('/init/:id' ,  sslpaymentController.initpayment)
router.post('/success/:tran_id/:id', sslpaymentController.success)
router.get('/validate/:val_id', sslpaymentController.validate)
router.post('/refund-request', sslpaymentController.RefundRequest)
router.get('/refund-query/:refund_ref_id', sslpaymentController.RefundQuery)
router.get('/transaction-status/:tran_id', sslpaymentController.TransactionStatus)

export default router;