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
  
    const AllLedger = async(req,res)=>{
  await reportService.AllLedger(req,res)
  }


  const Allholdbooking = async(req,res)=>{
    await reportService.sendBookingHold(req,res)
    }
  
    const firstinsatllemntCompleted = async(req,res)=>{
      await reportService.sendfirstinstallemntcompleted(req,res)
      }

      const secondinsatllemntCompleted = async(req,res)=>{
        await reportService.sendsecondinstallemntcompleted(req,res)
        }


      const paidbookingreport = async(req,res)=>{
        await reportService.sendBookingPaid(req,res)
        }
      
    
    
  

export const reportControlerr = {
  AllLedger,
  newUserReport,
  newUpackageVisitorReport,
  newBookingReport,
  getuserlast1day,
  getuserlast7day,
  getuserlast30day,
  newhalfBookingReport,
  halfdaypackagevisitor,
  Allholdbooking,
  firstinsatllemntCompleted,
  secondinsatllemntCompleted,
  paidbookingreport
}