import express from 'express'
import { sslpaymentController } from './controller';
const router  = express.Router()
router.get('/init/:id' ,  sslpaymentController.initpayment)
router.post('/success/:tran_id', sslpaymentController.success)
router.get('/validate/:val_id', sslpaymentController.validate)
router.post('/refund-request', sslpaymentController.RefundRequest)



export default router;