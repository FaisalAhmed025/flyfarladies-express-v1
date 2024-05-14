import httpStatus from "http-status";
import { packageSearch } from "./service";



const  getPackageByDifferent=  async (req,res)=> {
 await packageSearch.getTourPackagesByDifferentField(req,res)
  
}

const  getCityAndCountry =  async (req,res)=> {
  await packageSearch.getcityAndCountry(req,res)
   
 }

export const packageSearchController ={
  getPackageByDifferent,
  getCityAndCountry
}