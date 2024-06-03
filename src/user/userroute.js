import express from 'express';
import { upload } from '../tourpackage/imageUpload.midleware';
import { imageHandler, imageHandlerUpdate, optionalImage } from '../tourpackage/imageHandler';
import { userController } from './controller';

const router = express.Router();

// Define routes using the router object

router.post('/register', userController.RegisterUser)
router.post('/login', userController.loginuser)
router.post('/loginwithgoogle', userController.loginwithGoogle)
router.post('/loginwithfacebook', userController.loginwithfacebook)
router.post('/forgetpasss/request', userController.forgetpasswordResetRequest)
router.post('/resetpass', userController.resetPassword)
router.get('/mydashboard/:id', userController.userdashbaord)
router.get('/alluser', userController.alluserdata)
router.put('/update/:id', upload.single('images'), imageHandlerUpdate, userController.updateUser)
router.post('/traveller/add/:id', userController.addtravlercontroller)

router.put('/traveller/update/:partnerId', upload.single('images'), imageHandlerUpdate,  userController.updateTravlercontroller)
router.delete('/mytraveller/:partnerId', userController.deleteTraveller)
router.delete('/deleteuser/:id', userController.deleteUser)
router.get('/alltraveler/test/:user_id', userController.myTravelerList)
router.get('/ledger/:user_id', userController.userLedger)
router.get('/platform', userController.getplatform)

export default router;
