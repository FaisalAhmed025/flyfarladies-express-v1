


import express from 'express'
import { wishlistcontroller } from './controller'

const router  = express.Router()
router.post('/add',  wishlistcontroller.addWishlist)
router.get('/userwishlist/:id',  wishlistcontroller.userWishlist)
router.delete('/remove/:wishid',  wishlistcontroller.removeWishlist)

export default router;