
import express from 'express'
import { paymentController } from './controller';
const router  = express.Router()

router.post('/wallet/userid/:id/bookingid/:bookingid', paymentController.paywithwallet)
router.post('/wallet/bookingamount', paymentController.paybookingamount)
router.post('/wallet/secondinstallment', paymentController.paySecondInstallment)
router.post('/wallet/thirdinstallment', paymentController.paythiredInstallment)

export default router;