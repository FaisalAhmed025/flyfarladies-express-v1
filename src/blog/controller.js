import { blogService } from "./service"

const addBlog = async(req,res)=>{
  await blogService.addBlog(req,res)
}

const getallblogs = async(req,res)=>{
  await blogService.getallblogs(req,res)
}


const deleteBlog = async(req,res)=>{
  await blogService.deleteBlog(req,res)
}

const updateBlogcontroller = async(req,res)=>{
  await blogService.updateBlog(req,res)
}

const updateimages = async(req,res)=>{
  await blogService.updateBlogImage(req,res)
}

export const blogcontroller  = {
  addBlog,
  getallblogs,
  deleteBlog,
  updateBlogcontroller,
  updateimages
}