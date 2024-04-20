
import express from 'express'
import { paymentController } from './controller';
const router  = express.Router()

router.post('/wallet/fullpayment', paymentController.paywithwallet)
router.post('/wallet/bookingamount', paymentController.paybookingamount)
router.post('/wallet/secondinstallment', paymentController.paySecondInstallment)
router.post('/wallet/thirdinstallment', paymentController.paythiredInstallment)
router.post('/wallet/first/second', paymentController.payfirstAndsecondInstallment)
router.post('/wallet/second/third', paymentController.paySecondAndthirdInstallment)
router.post('/wallet/second/third', paymentController.paySecondAndthirdInstallment)
router.post('/ssl/fullamount/payment', paymentController.initpaywithsslfullamount)
router.post('/ssl/success/fullpayment/:tran_id/:bookingid', paymentController.succeesssslfullamount)

router.post('/ssl/bookingamount', paymentController.initpaywithsslbookingAmount)
router.post('/ssl/success/bookingamount/:tran_id/:bookingid', paymentController.succeesssslbookingAmount)

router.post('/ssl/1stinstallment', paymentController.initwithssl1stinstallemnt)
router.post('/ssl/success/1stinstallment/:tran_id/:bookingid', paymentController.succeessssl1stinstallemnt)


router.post('/ssl/2ndinstallment', paymentController.initwithssl2ndinstallemnt)
router.post('/ssl/success/2ndinstallment/:tran_id/:bookingid', paymentController.succeessssl2ndinstallemnt)

router.post('/ssl/1nstand2ndinstallment', paymentController.initwithssl1stAnd2ndinstallemnt)
router.post('/ssl/success/1nstand2ndinstallment/:tran_id/:bookingid', paymentController.succeessssl1stAnd2ndinstallemnt)


router.post('/ssl/2ndAnd3rdinstallment', paymentController.initwithssl2ndANd3rdinstallemnt)
router.post('/ssl/success/2ndAnd3rdinstallment/:tran_id/:bookingid', paymentController.succeessssl2ndANd3rdInstallemnt)

export default router;