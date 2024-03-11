import httpStatus from "http-status";
import { tourpackageService } from "./service";


const addpackage = async (req, res)=>{
  const data = await  tourpackageService.addtourpackage(req,res)
  return res.status(200).json({status:"success", messsage:"package added successfully", data:data})
}


const getSingleTourPackages = async (req, res, next) => {
  try {
    const id = req.params.PkID;
    const result = await tourpackageService.getSingleTourPackages(id);

    // Check if the result is an error
    if (result instanceof Error) {
      return res.status(500).json({
        error: 'An error occurred while retrieving tour packages',
      });
    }

    return res.status(200).json({
      success: true,
      status: httpStatus.OK,
      message: 'tour packages retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getAllTourPackages = async (req, res, next) => {
  try {
    const result = await tourpackageService.getAllTourPackages();

    // Check if the result is an error
    if (result instanceof Error) {
      return res.status(500).json({
        error: 'An error occurred while retrieving tour packages',
      });
    }

    return res.status(200).json({
      success: true,
      status: httpStatus.OK,
      message: 'tour packages retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const tourpackageController = {
  getSingleTourPackages,
  getAllTourPackages,
  addpackage

}