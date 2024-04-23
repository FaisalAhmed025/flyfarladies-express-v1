import httpStatus from "http-status";
import { packageSearch } from "./service";



const  getPackageByDifferent=  async (req,res)=> {
 await packageSearch.getTourPackagesByDifferentField(req,res)
  
}

export const packageSearchController ={
  getPackageByDifferent
}