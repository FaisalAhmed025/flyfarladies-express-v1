

import express from 'express'
import { bkashController } from './bkash.controller'
const router = express.Router()

router.get('/gettoken', bkashController.generateToken)

export default router;