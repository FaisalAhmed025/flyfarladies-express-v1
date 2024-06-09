import express from 'express'
import { reportControlerr } from './controller'
const router  = express.Router()

router.get('/newuser', reportControlerr.newUserReport)

export default router;