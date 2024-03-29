import express from 'express';
import { upload } from '../tourpackage/imageUpload.midleware';
import { imageHandler, imageHandlerUpdate, optionalImage } from '../tourpackage/imageHandler';
import { userController } from './controller';

const router = express.Router();

// Define routes using the router object

router.post('/register', userController.RegisterUser)
router.post('/login', userController.loginuser)
router.get('/mydashboard/:id', userController.userdashbaord)
router.put('/update/:id', upload.single('images'), imageHandlerUpdate, userController.updateUser)
router.post('/traveller/add/:id', userController.addtravlercontroller)

router.put('/traveller/update/:partnerId', upload.single('images'), imageHandlerUpdate,  userController.updateTravlercontroller)

router.get('/mytraveller/tst/:user_id', userController.myTravelerList)
router.delete('/mytraveller/:partnerId', userController.deleteTraveller)


export default router;
