import httpStatus from "http-status";
import { UserService } from "./service";


const RegisterUser = async (req, res) => {
  const result = await UserService.Register(req,res)
  result && res.status(200).send({
      success: true,
      message: 'Register successfully',
      data: result
  })
};

const loginuser = async (req, res) => {
  const result = await UserService.login(req,res)
  result && res.status(200).send({
      success: true,
      message: 'login successfully',
      data: result
  })
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
  result && res.status(200).send({
      success: true,
      message: 'updated successfully',
      data: result
  })
};


export const userController = {
  RegisterUser,
  loginuser,
  updateUser,
  userdashbaord,
  addtravlercontroller,
  updateTravlercontroller,
  myTravelerList,
  deleteTraveller

}


