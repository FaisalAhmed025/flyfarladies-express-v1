import { addAbortListener } from "nodemailer/lib/xoauth2"
import { reportService } from "./service"



const  newUserReport = async(req,res)=>{
await reportService.dailynewUser(req,res)
}


const  newUpackageVisitorReport = async(req,res)=>{
  await reportService.newUpackageVisitorReport(req,res)
  }


const  newBookingReport = async(req,res)=>{
await reportService.dailynewBooking(req,res)
}


export const reportControlerr = {
  newUserReport,
  newUpackageVisitorReport,
  newBookingReport
}