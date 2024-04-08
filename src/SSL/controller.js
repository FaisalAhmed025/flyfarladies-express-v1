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

const RefundQuery = async(req,res)=>{
  await sslpaymentService.refundQuery(req,res)
}

const TransactionStatus = async(req,res)=>{
  await sslpaymentService.transactionStatus(req,res)
}


export const  sslpaymentController ={
  initpayment,
  success,
  validate,
  RefundRequest,
  RefundQuery,
  TransactionStatus
}