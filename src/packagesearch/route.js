
import express from 'express'
import { packageSearchController } from './controller';


const router = express.Router()

router.get('/getpackagewithdifferentfield', packageSearchController.getPackageByDifferent )
router.get('/getlocation', packageSearchController.getCityAndCountry )

export default router;