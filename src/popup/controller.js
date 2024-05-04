import { blogPopUp } from "./service"

const addpopUp = async(req,res)=>{
  await blogPopUp.addpopUp(req,res)
}

const subscription = async(req,res)=>{
  await blogPopUp.Subscription(req,res)
}


const getallPopUp = async(req,res)=>{
  await blogPopUp.getpopupimage(req,res)
}


// const deletePOp = async(req,res)=>{
//   await blogPopUp.deleteBlog(req,res)
// }

const updatepopUp = async(req,res)=>{
  await blogPopUp.updatePopup(req,res)
}

export const popUPcontroller  = {
  addpopUp,
  getallPopUp,
  updatepopUp,
  subscription
}