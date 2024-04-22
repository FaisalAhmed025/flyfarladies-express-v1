
import express from 'express'
import { upload } from '../tourpackage/imageUpload.midleware'
import { handleblogImage, imageHandler, imageHandlerUpdate, optionalImage } from '../tourpackage/imageHandler'
import { blogcontroller } from './controller'
import { blogService } from './service'
const router  = express.Router()

router.post('/addblog',  upload.fields([{name:'blogimages', maxCount:10}, {name:'secondimage', maxCount:10}]),  handleblogImage, blogcontroller.addBlog)
router.get('/all', blogcontroller.getallblogs)
router.delete('/:id', blogcontroller.deleteBlog)
router.patch('/update/:id', upload.single('image'), imageHandlerUpdate, blogcontroller.updateBlogcontroller)
router.patch('/blogid/:id/urlid/:urlid',  upload.single('image'), imageHandlerUpdate,  blogcontroller.updateimages)


export default router;