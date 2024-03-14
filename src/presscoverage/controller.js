import { pressCoverService } from "./service"


const addPressCoverage = async (req,res)=>{
  const  data  = await  pressCoverService.addPressCoverage(req,res)
  return res.status(200).json({status:"success", messsage:"Press coverage added successfully", data:data})
}

const getAllpresscoverage = async (req,res)=>{
  const data = await pressCoverService.getAllPressCoverage(req,res)
  return res.status(200).json({status:"success", messsage:"Press coverage added successfully", data:data})

}

const  updatepressCoverage = async (req,res) =>{
  const id = req.params.id
  const data = await pressCoverService.updatepressCoverage(req,id);
  return res.status(200).json({status:"success", messsage:"Press coverage update successfully", data:data});
}


export const pressCoverageControllerr = {
  addPressCoverage,
  getAllpresscoverage,
  updatepressCoverage
}