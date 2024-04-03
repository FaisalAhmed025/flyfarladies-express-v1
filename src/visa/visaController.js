import { getCountryName, getCountryType, getVisaInfo } from './visaService';

const getVisaController = async (req, res) => {
  try {
    const visaType = req.query.visaType;
    const countryName = req.query.countryName;
    const result = await getVisaInfo(countryName, visaType);
    res.status(200).json({
      success: true,
      message: 'Visa info retrieve successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};
const getCountryController = async (req, res) => {
  try {
    const result = await getCountryName();
    res.status(200).json({
      success: true,
      message: 'Visa info retrieve successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};
const getCountryTypeController = async (req, res) => {
  try {
    const countryName = req.query.countryName;
    const result = await getCountryType(countryName);
    res.status(200).json({
      success: true,
      message: 'Visa info retrieve successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};

export const visaController = {
  getVisaController,
  getCountryController,
  getCountryTypeController,
};
