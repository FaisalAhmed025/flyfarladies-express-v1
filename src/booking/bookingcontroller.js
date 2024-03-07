import { BookingService } from "./bookingservice";



const Book$Hold  = async (req, res) => {
  const book = await BookingService.Book$Hold(req,res);
 return res.json({
    data:book
  })

}


export const bookingController = {
  Book$Hold
}