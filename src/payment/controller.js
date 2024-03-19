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


export const paymentController =  {
  paywithwallet,
  paybookingamount
}

