import { sslpaymentService } from "./service"



const initpayment = async(req,res)=>{
  await sslpaymentService.initpayment(req,res)
}

const success = async(req,res)=>{
  await sslpaymentService.sucesss(req,res)
}

const validate = async(req,res)=>{
  await sslpaymentService.validatepayment(req,res)
}

const RefundRequest = async(req,res)=>{
  await sslpaymentService.refundInitiate(req,res)
}

export const  sslpaymentController ={
  initpayment,
  success,
  validate,
  RefundRequest
}