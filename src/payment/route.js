

import express from 'express'
import { paymentController } from './controller';
const router  = express.Router()

router.post('/wallet/userid/:id/bookingid/:bookingid', paymentController.paywithwallet)

export default router;