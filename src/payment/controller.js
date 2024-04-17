import httpStatus from "http-status";
import { payemntService } from "./service"



const paywithwallet =  async (req,res)=>{
  const result = await payemntService.paywithwallet(req,res)
  res.status(httpStatus.OK).json({
    success: true,
    message:
      'payment Successful',
    data: result,
  });
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
      'payment Successful',
    data: result,
  });
}

const paythiredInstallment =  async (req,res)=>{
  const result = await payemntService.paythiredInstallment(req,res)
  res.status(httpStatus.OK).json({
    success: true,
    message:
      'payment Successful',
    data: result,
  });
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
  res.status(httpStatus.OK).json({
    success: true,
    message:
      'payment Successful',
    data: result,
  });
}


const initpaywithsslfullamount =  async (req,res)=>{
  const result = await payemntService.initwithsslfullamount(req,res)
  res.status(httpStatus.OK).json({
    success: true,
    message:
      'payment Successful',
    data: result,
  });
}


const succeesssslfullamount =  async (req,res)=>{
  const result = await payemntService.sucesssslfullamount(req,res)
  res.status(httpStatus.OK).json({
    success: true,
    message:
      'payment Successful',
    data: result,
  });
}





export const paymentController =  {
  paywithwallet,
  paybookingamount,
  paySecondInstallment,
  paythiredInstallment,
  payfirstAndsecondInstallment,
  paySecondAndthirdInstallment,
  initpaywithsslfullamount,
  succeesssslfullamount
}

