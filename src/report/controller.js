import { addAbortListener } from "nodemailer/lib/xoauth2"
import { reportService } from "./service"



const  newUserReport = async(req,res)=>{
await reportService.dailynewUser(req,res)
}


const  newUpackageVisitorReport = async(req,res)=>{
  await reportService.dailypackagevisitor(req,res)
  }


const  newBookingReport = async(req,res)=>{
await reportService.dailynewBooking(req,res)
}

const  newhalfBookingReport = async(req,res)=>{
  await reportService.getBookingsByLast12Hours(req,res)
  }



const  getuserlast1day = async(req,res)=>{
  await reportService.getuserLast1Day(req,res)
  }


  const  getuserlast7day = async(req,res)=>{
    await reportService.getUserLast7Days(req,res)
    }


    
  const  getuserlast30day = async(req,res)=>{
    await reportService.getUserLast30Days(req,res)
    }


    const halfdaypackagevisitor = async(req,res)=>{
      await reportService.halfdaypackagevisit(req,res)
      }
      
    
    
  


export const reportControlerr = {
  newUserReport,
  newUpackageVisitorReport,
  newBookingReport,
  getuserlast1day,
  getuserlast7day,
  getuserlast30day,
  newhalfBookingReport,
  halfdaypackagevisitor
}