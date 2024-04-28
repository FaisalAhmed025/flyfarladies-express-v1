import { askQuestionService } from "./service"


const AskQuestion=  async (req,res)=>{
await  askQuestionService.AskQuestion(req,res)
}

const subsciption =  async(req,res)=>{
  
}

const allquery=  async (req,res)=>{
  await askQuestionService.allAskQuestion(req,res)
  }

export const askQuestionController ={
  AskQuestion,
  allquery
}