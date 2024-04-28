
import express  from 'express'
import { askQuestionController } from './controller';
const router = express.Router()

router.post('/ask', askQuestionController.AskQuestion)
router.get('/all', askQuestionController.allquery)
export default router;