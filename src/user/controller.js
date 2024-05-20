import httpStatus from "http-status";
import { UserService } from "./service";


const RegisterUser = async (req, res) => {
   await UserService.Register(req,res)

};

const loginuser = async (req, res) => {
   await UserService.login(req,res)

};

const deleteUser = async (req, res) => {
  await UserService.deleteUser(req,res)

};


const loginwithGoogle = async (req, res) => {
  await UserService.loginwithGoogle(req,res)

};

const loginwithfacebook = async (req, res) => {
  await UserService.loginwithfacebook(req,res)

};





const addtravlercontroller = async (req, res) => {
  try {
    const result = await UserService.addtravler(req);
    // Check if the result is an error
    if (result instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(200).json({
      success: true,
      status: httpStatus.OK,
      message: 'traveller added successfully',
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

const updateTravlercontroller = async (req, res) => {
  try {
    const result = await UserService.updateTraveler(req);
    // Check if the result is an error
    if (result instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(200).json({
      success: true,
      status: httpStatus.OK,
      message: 'traveller updated successfully',
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



const userdashbaord = async (req, res) => {
  const result = await UserService.userdashBoard(req,res)
  result && res.status(200).send({
      success: true,
      message: 'user details',
      data: result
  })
};

const deleteTraveller = async (req, res) => {
  const result = await UserService.deleteTraveller(req,res)
  result && res.status(200).send({
      success: true,
      message: 'traveler has deleted',
      data: result
  })
};


const myTravelerList = async (req, res) => {
  const result = await UserService.myTravelerList(req,res)
  result && res.status(200).send({
      success: true,
      message: 'my traveller',
      data: result
  })
};



const updateUser = async (req, res) => {
  const result = await UserService.updateUser(req,res)
  return result;
};

const alluserdata = async (req, res) => {
  const result = await UserService.allUser(req,res)
  return result;
};

const forgetpasswordResetRequest = async (req, res) => {
  const result = await UserService.forgetpasswordResetRequest(req,res)
  return result;
};


const resetPassword = async (req, res) => {
  const result = await UserService.resetPassword(req,res)
  return result;
};

const userLedger = async (req, res) => {
  const result = await UserService.userLedger(req,res);
};



export const userController = {
  RegisterUser,
  loginuser,
  userLedger,
  deleteUser,
  loginwithfacebook,
  forgetpasswordResetRequest,
  resetPassword,
  updateUser,
  userdashbaord,
  addtravlercontroller,
  updateTravlercontroller,
  myTravelerList,
  deleteTraveller,
  loginwithGoogle,
  alluserdata

}


