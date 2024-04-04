import { bkashService } from "./bkash.service"


 const generateToken = async (req,res) =>{
 const data =  await bkashService.generateToken(req,res)
 return res.status(200).json({
  data:data
 })
}

const createPayment = async (req,res) =>{
   await bkashService.CreatePayment(req,res)
 }

 const QueryPayment = async (req,res) =>{
  await bkashService.QueryPayment(req,res)
}

const bkasSearch = async (req,res) =>{
  await bkashService.getTransaction(req,res)
}

 const callback = async (req,res) =>{
  await bkashService.callback(req,res)
 }

 const refundAmount = async (req,res) =>{
  await bkashService.refundAmount(req,res)
 }
 
 

 export const bkashController ={
   generateToken,
   createPayment,
   callback,
   QueryPayment,
   bkasSearch,
   refundAmount
}