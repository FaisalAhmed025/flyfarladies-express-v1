import { wishlistService } from "./service"




const addWishlist  = async(req,res)=>{
  const data  = await wishlistService.addwishlist(req,res)
  return data;
}

const userWishlist  = async(req,res)=>{
  const data  = await wishlistService.userwishlist(req,res)
  return data;
}


const removeWishlist  = async(req,res)=>{
  const data  = await wishlistService.removeWishlist(req,res)
  return data;
}


export const wishlistcontroller = {
  addWishlist,
  userWishlist,
  removeWishlist
}