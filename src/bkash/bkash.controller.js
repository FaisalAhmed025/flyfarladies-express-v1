import { bkashService } from "./bkash.service"


 const generateToken = async (req,res) =>{
 const data =  await bkashService.generateToken(req,res)
 return res.status(200).json({
  data:data
 })
}



 export const bkashController ={
generateToken
}