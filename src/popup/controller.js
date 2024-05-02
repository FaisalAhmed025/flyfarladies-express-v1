import { blogPopUp } from "./service"

const addpopUp = async(req,res)=>{
  await blogPopUp.addpopUp(req,res)
}

const getallPopUp = async(req,res)=>{
  await blogPopUp.getallblogs(req,res)
}


const deletePOp = async(req,res)=>{
  await blogPopUp.deleteBlog(req,res)
}

const updateBlogcontroller = async(req,res)=>{
  await blogPopUp.updateBlog(req,res)
}

export const popUPcontroller  = {
  addpopUp,
  getallPopUp,
  deletePOp,
  updateBlogcontroller,
}