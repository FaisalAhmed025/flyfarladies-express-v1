import { addAbortListener } from "nodemailer/lib/xoauth2"
import { reportService } from "./service"



const  newUserReport = async(req,res)=>{
await reportService.fetchNewUsers(req,res)
}


export const reportControlerr = {
  newUserReport
}