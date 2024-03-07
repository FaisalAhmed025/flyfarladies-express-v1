import { tourpackageController } from '../tourpackage/controller/controller';
import express from 'express';
import { userController } from '../user/controller/userController.js';
import { upload } from '../tourpackage/service/service.js';
import { imageHandler, imageHandlerUpdate } from '../tourpackage/helper/imageHandler.js';

const router = express.Router();

// Define routes using the router object

router.post('/register', userController.RegisterUser)
router.post('/login', userController.loginuser)
router.get('/mydashboard/:id', userController.userdashbaord)
router.patch('/update/:id', upload.single('images'), imageHandlerUpdate, userController.updateUser)
router.post('/traveller/add/:id', userController.addtravlercontroller)
router.put('/traveller/update/:partnerId', upload.single('images'), imageHandler,  userController.updateTravlercontroller)
router.get('/mytraveller/:user_id', userController.myTravelerList)
router.delete('/mytraveller/:partnerId', userController.deleteTraveller)
// router.post('/add', tourpackageController.addpackage)

export default router;
