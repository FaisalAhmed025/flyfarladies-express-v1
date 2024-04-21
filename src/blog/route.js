
import express from 'express'
import { upload } from '../tourpackage/imageUpload.midleware'
import { handleblogImage } from '../tourpackage/imageHandler'
import { blogcontroller } from './controller'
import { blogService } from './service'
const router  = express.Router()

router.post('/addblog',  upload.fields([{name:'blogimages', maxCount:10}, {name:'secondimage', maxCount:10}]),  handleblogImage, blogcontroller.addBlog)
router.get('/all', blogcontroller.getallblogs)
router.delete('/:id', blogcontroller.deleteBlog)
router.patch('/update/:id', blogcontroller.updateBlog)
router.patch('/updateurl/:id',  blogcontroller.updateimages)




export default router;