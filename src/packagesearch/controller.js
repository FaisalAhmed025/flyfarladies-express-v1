import httpStatus from "http-status";
import { packageSearch } from "./service";



const  getPackageByDifferent=  async (req,res)=> {
  const result = await packageSearch.getTourPackagesByDifferentField(req,res)
  res.status(httpStatus.OK).json({
    success: true,
    data: result,
  });
}

export const packageSearchController ={
  getPackageByDifferent
}