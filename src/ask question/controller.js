import { askQuestionService } from "./service"


const AskQuestion=  async (req,res)=>{
await  askQuestionService.AskQuestion(req,res)
}

export const askQuestionController ={
  AskQuestion
}