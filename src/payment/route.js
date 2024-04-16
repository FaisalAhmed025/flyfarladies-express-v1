
import express from 'express'
import { paymentController } from './controller';
const router  = express.Router()

router.post('/wallet/fullpayment', paymentController.paywithwallet)
router.post('/wallet/bookingamount', paymentController.paybookingamount)
router.post('/wallet/secondinstallment', paymentController.paySecondInstallment)
router.post('/wallet/thirdinstallment', paymentController.paythiredInstallment)
router.post('/wallet/first/second', paymentController.payfirstAndsecondInstallment)
router.post('/wallet/second/third', paymentController.paySecondAndthirdInstallment)

export default router;