import { pressCoverService } from "./service"


const addPressCoverage = async (req,res)=>{
   await  pressCoverService.addPressCoverage(req,res)
}

const deletePress = async (req,res)=>{
  await  pressCoverService.deletepress(req,res)
}

const getAllpresscoverage = async (req,res)=>{
  await pressCoverService.getAllPressCoverage(req,res)
}

const  updatepressCoverage = async (req,res) =>{
  const id = req.params.id
  const data = await pressCoverService.updatepressCoverage(req,id);
  return res.status(200).json({status:"success", messsage:"Press coverage update successfully", data:data});
}


export const pressCoverageControllerr = {
  addPressCoverage,
  getAllpresscoverage,
  updatepressCoverage,
  deletePress
}