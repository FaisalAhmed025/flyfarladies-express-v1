import { bkashService } from "./bkash.service"


 const generateToken = async (req,res) =>{
 const data =  await bkashService.generateToken(req,res)
 return res.status(200).json({
  data:data
 })
}

const createPayment = async (req,res) =>{
   await bkashService.createPayment(req,res)
 }


 const QueryPayment = async (req,res) =>{
  await bkashService.QueryPayment(req,res)
}

 

 const callback = async (req,res) =>{
  await bkashService.callback(req,res)
 }

 const executePayment = async (req,res) =>{
  const paymentID =  req.params.paymentID
  await bkashService.executepayment(paymentID,res)


 }

 const refundAmount = async (req,res) =>{
  await bkashService.refundAmount(req,res)


 }
 
 



 export const bkashController ={
   generateToken,
   createPayment,
   callback,
   executePayment,
   QueryPayment,
   refundAmount
}