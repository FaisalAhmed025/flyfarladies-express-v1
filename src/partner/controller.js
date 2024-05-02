import { PartnerService } from "./service"


const getAllpartner = async(req,res)=>{
  await PartnerService.getallPartner(req,res)
}

const Addpartner = async(req,res)=>{
  await PartnerService.addPartner(req,res)
}

const deletePartner= async(req,res)=>{
  await PartnerService.deletepartner(req,res)
}

const updatePartner= async(req,res)=>{
  await PartnerService.updatePartner(req,res)
}

export const partnerController ={
  getAllpartner,
  Addpartner,
  deletePartner,
  updatePartner
}