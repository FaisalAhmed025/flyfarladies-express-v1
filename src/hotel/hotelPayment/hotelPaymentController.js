import { hotelPaymentService } from './hotelPaymentService';

const hotelPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await hotelPaymentService.hotelIssueRequest(req, id);
    res.status(200).json({
      success: true,
      message: 'Issue request successful',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const hotelPaymentController = {
  hotelPayment,
};
