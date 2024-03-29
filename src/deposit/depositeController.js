

import httpStatus from "http-status";

import { depositeService } from "./depositeService";



const createBankDeposit = async (req, res) => {
  try {
    const result = await depositeService.createBankDeposit(req);
    res.status(httpStatus.OK).json({
      success: true,
      message:
        'Bank transfer request created successfully.Please wait for approval',
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const CheckDepositController = async (req, res) => {
  try {
    const result = await depositeService.createCheckDeposit(req);
    res.status(httpStatus.OK).json({
      success: true,
      message:
        'Check deposit request created successfully.Please wait for approval',
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};


const cashDepositController = async (req, res) => {
  try {
    const result = await depositeService.createCashDeposit(req);
    res.status(httpStatus.OK).json({
      success: true,
      message:
        'Cash deposit request created successfully.Please wait for approval',
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};




const updateDepositStatus = async (req, res) => {
  try {
    // Update the deposit request status and send email notifications
    const result = await depositeService.ApprovedBankDeposit(
      req
    );
      res.status(200).json({
        success: true,
        message: `Deposit request approved successfully`,
        data: result,
      });
    
  } catch (error) {
    console.error('Error updating deposit request status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const approvedCashDEposit = async (req, res) => {
  try {
    // Update the deposit request status and send email notifications
    const result = await depositeService.ApprovedCashDeposit(
      req
    );
      res.status(200).json({
        success: true,
        message: `Deposit request approved successfully`,
        data: result,
      });
    
  } catch (error) {
    console.error('Error updating deposit request status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const approvedCheckDeposit = async (req, res) => {
  try {
    // Update the deposit request status and send email notifications
    const result = await depositeService.ApprovedCheckDeposit(
      req);
      res.status(200).json({
        success: true,
        message: `Deposit request approved successfully`,
        data: result,
      });
  } catch (error) {
    console.error('Error updating deposit request status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





export const depositeControlller = {
  createBankDeposit,
  CheckDepositController,
  cashDepositController,
  updateDepositStatus,
  approvedCashDEposit,
  approvedCheckDeposit
};