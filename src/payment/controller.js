import httpStatus from "http-status";
import { payemntService } from "./service"



const paywithwallet =  async (req,res)=>{
  await payemntService.paywithwallet(req,res)

}


const paybookingamount =  async (req,res)=>{
  const result = await payemntService.paybookingamount(req,res)
  res.status(httpStatus.OK).json({
    success: true,
    message:
      'payment Successful',
    data: result,
  });
}

const paySecondInstallment =  async (req,res)=>{
  const result = await payemntService.paySecondInstallment(req,res)
  res.status(httpStatus.OK).json({
    success: true,
    message:
      'second installment payment Successful',
    data: result,
  });
}

const paythiredInstallment =  async (req,res)=>{
  const result = await payemntService.paythiredInstallment(req,res)
}


const payfirstAndsecondInstallment =  async (req,res)=>{
  const result = await payemntService.payFirstandSecondInstallment(req,res)
  res.status(httpStatus.OK).json({
    success: true,
    message:
      'payment Successful',
    data: result,
  });
}

const paySecondAndthirdInstallment =  async (req,res)=>{
  const result = await payemntService.paySecondandthirdInstallment(req,res)


}



const initpaywithsslfullamount =  async (req,res)=>{
  await payemntService.initwithsslfullamount(req,res)

}


const succeesssslfullamount =  async (req,res)=>{
   await payemntService.sucesssslfullamount(req,res)
 
}

const cancelledlfullamount =  async (req,res)=>{
  await payemntService.cancelledfullamount(req,res)

}


const initpaywithsslbookingAmount=  async (req,res)=>{
  await payemntService.initwithsslbookingmoney(req,res)

}


const succeesssslbookingAmount =  async (req,res)=>{
   await payemntService.sucess_ssl_bookingAmount(req,res)
 
}




const initwithssl1stinstallemnt=  async (req,res)=>{
  await payemntService.initwithssl1stinstallemnt(req,res)

}


const succeessssl1stinstallemnt =  async (req,res)=>{
   await payemntService.success_ssl_1stinstallemnt(req,res)
 
}


const initwithssl2ndinstallemnt =  async (req,res)=>{
  await payemntService.initwithssl2ndinstallemnt(req,res)

}


const succeessssl2ndinstallemnt =  async (req,res)=>{
   await payemntService.success_ssl_2ndinstallemnt(req,res)
 
}


const initwithssl1stAnd2ndinstallemnt =  async (req,res)=>{
  await payemntService.initwithssl1stAnd2ndinstallment(req,res)
}


const succeessssl1stAnd2ndinstallemnt =  async (req,res)=>{
   await payemntService.sucess_ssl_1st_and_2nd_booking_Amount(req,res)
}


const initwithssl2ndANd3rdinstallemnt =  async (req,res)=>{
  await payemntService.initwithssl2ndand3rdinstallment(req,res)
}


const succeessssl2ndANd3rdInstallemnt =  async (req,res)=>{
   await payemntService.sucess_ssl_2nd_3rd_installemntAmount(req,res)
}



export const paymentController =  {
  paywithwallet,
  paybookingamount,
  paySecondInstallment,
  paythiredInstallment,
  cancelledlfullamount,
  payfirstAndsecondInstallment,
  paySecondAndthirdInstallment,
  initpaywithsslfullamount,
  succeesssslfullamount,
  initpaywithsslbookingAmount,
  succeesssslbookingAmount,
  initwithssl1stinstallemnt,
  succeessssl1stinstallemnt,
  initwithssl2ndinstallemnt,
  succeessssl2ndinstallemnt,
  initwithssl1stAnd2ndinstallemnt,
  succeessssl1stAnd2ndinstallemnt,
  initwithssl2ndANd3rdinstallemnt,
  succeessssl2ndANd3rdInstallemnt


}

