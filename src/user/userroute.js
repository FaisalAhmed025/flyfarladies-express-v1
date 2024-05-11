import express from 'express';
import { upload } from '../tourpackage/imageUpload.midleware';
import { imageHandler, imageHandlerUpdate, optionalImage } from '../tourpackage/imageHandler';
import { userController } from './controller';

const router = express.Router();

// Define routes using the router object

router.post('/register', userController.RegisterUser)
router.post('/login', userController.loginuser)
router.post('/loginwithgoogle', userController.loginwithGoogle)
router.post('/forgetpasss/request', userController.forgetpasswordResetRequest)
router.post('/resetpass', userController.resetPassword)
router.get('/mydashboard/:id', userController.userdashbaord)
router.get('/alluser', userController.alluserdata)
router.put('/update/:id', upload.single('images'), imageHandlerUpdate, userController.updateUser)
router.post('/traveller/add/:id', userController.addtravlercontroller)

router.put('/traveller/update/:partnerId', upload.single('images'), imageHandlerUpdate,  userController.updateTravlercontroller)
router.get('/mytraveller/tst/:user_id', userController.myTravelerList)
router.delete('/mytraveller/:partnerId', userController.deleteTraveller)
router.delete('/user/:id', userController.deleteUser)


export default router;
