
import express from 'express'
import { packageSearchController } from './controller';


const router = express.Router()

router.get('/getpackagewithdifferentfield', packageSearchController.getPackageByDifferent )

export default router;