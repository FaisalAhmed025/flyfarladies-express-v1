import httpStatus from "http-status";
import { tourpackageService } from "../service/service";



const addpackage = async (req, res)=>{
  const data = await  tourpackageService.addtourpackage(req,res)
  return res.status(200).json({status:"success", messsage:"package added successfully", data:data})
}


const updatePackage = async (req,res)=>{
  try{
  const PkID = req.params.PkID;
  const result = await tourpackageService.updateTourPackage(req, PkID)
  // Check if the result is an error
  if (result instanceof Error) {
    return res.status(500).json({
      error: 'An error occurred while creating Main Image',
    });
  }
  return  res.status(200).json({
    success: true,
    status: httpStatus.OK,
    message: 'package updated successfully',
    data: result,
  });
} catch (error) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: error.message,
  });
}

}

const mainimage = async (req, res) => {
  try {
    const PkID = req.params.PkID;
    const result = await tourpackageService.MainImage(req, PkID)
    // Check if the result is an error
    if (result instanceof Error) {
      return res.status(500).json({
        error: 'An error occurred while creating Main Image',
      });
    }
    return res.status(200).json({
      success: true,
      status: httpStatus.OK,
      message: 'main image  created successfully',
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


const updateMainImageController = async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const result = await tourpackageService.UpdateMainImage(req, imageId);

    // Check if the result is an error
    if (result instanceof Error) {
      res.status(500).json({
        error: 'An error occurred while updating cover images',
      });
    } else {
      res.status(200).json({
        success: true,
        status: 'OK',
        message: 'image updated successfully',
        data: result,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while updating cover images',
    });
  }
};

const createPlaceVisit = async (req, res) => {
  try {
    const PkID = req.params.PkID;
    const result = await tourpackageService.createPlaceVisit(req, PkID);

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
      message: 'place to visited image created successfully',
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


const createAlbumimage = async (req, res) => {
  try {
    const PkID = req.params.PkID;
    const result = await tourpackageService.createAlbumImage(req, PkID);

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
      message: 'album image created successfully',
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

const updateAlbumController = async (req, res) => {
  try {
    const AlbumId = req.params.AlbumId;
    const result = await tourpackageService.UpdateAlbumImage(req, AlbumId);

    // Check if the result is an error
    if (result instanceof Error) {
      res.status(500).json({
        error: 'An error occurred while updating cover images',
      });
    } else {
      res.status(200).json({
        success: true,
        status: 'OK',
        message: 'Album images updated successfully',
        data: result,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while updating cover images',
    });
  }
};


const createTourPlan = async (req, res) => {
  try {
    // Call the service layer to update or insert tour plans
    const result = await tourpackageService.createTourPlan(
      req
    );

    res.status(200).json({
      success: true,
      status: 'success',
      message: 'Tour plans updated or inserted successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
     message: error.message,
    });
  }
};


const createInclusion = async (req, res) => {
  try {
    const PkID = req.params.PkID;
    const result = await tourpackageService.createInclusion(req, PkID);

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
      message: 'Inclusion created successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const createExclusion = async (req, res) => {
  try {
    const id = req.params.PkID;
    const result = await tourpackageService.createExclusion(req, id);

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
      message: 'Exclusion created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const createBookingPolicy = async (req, res) => {
  try {
    const id = req.params.PkID;
    const result = await tourpackageService.createBookingPolicy(req, id);

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
      message: 'Booking Policy created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





const updateTourPlanEvents = async eventsData => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const updatedEvents = [];

    for (const event of eventsData) {
      const {
        id,
        day_event_title,
        day_event_time,
        day_event_location,
        day_event_description,
      } = event;

      if (id) {
        const tourPlanEventsUpdateQuery = `
          UPDATE tour_plan_events
          SET day_event_title = ?,
              day_event_time = ?,
              day_event_location = ?,
              day_event_description = ?
          WHERE id = ?
        `;

        const tourPlanEventsUpdateValues = [
          day_event_title,
          day_event_time,
          day_event_location,
          day_event_description,
          id,
        ];

        const [updateResult] = await connection.query(
          tourPlanEventsUpdateQuery,
          tourPlanEventsUpdateValues
        );

        if (updateResult.affectedRows > 0) {
          updatedEvents.push({ id });
        }
      }
    }

    await connection.commit();

    return updatedEvents;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};


const createCancelationPolicy = async (req, res) => {
  try {
    const id = req.params.PkID;

    const result = await tourpackageService.createCancelationPolicy(req, id);

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
      message: 'Cancellation Policy created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const addAddOnsController = async (req, res) => {
  try {
    const tour_package_id = req.params.PkID;
    const result = await tourpackageService.createAddOns(tour_package_id, req);
    // Respond with the result
    res.status(200).json({
      success: true,
      message: 'Add on created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


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


const createHighlights = async (req, res) => {
  try {
    const id = req.params.PkID;
    const result = await tourpackageService.createHighlights(req, id);

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
      message: 'Highlights created successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTourPlan = async (req, res) => {
  try {
    const tourPlanId = req.params.id; // Assuming the tourPlanId is provided as a URL parameter

    // Call the getTourPlan function to retrieve the tour plan details
    const tourPlanDetails = await tourpackageService.getTourPlan(tourPlanId);

    // Send the tour plan details as a JSON response
    res.status(200).json({
      success: true,
      message: 'Tour plan get successfully',
      data: tourPlanDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Assuming you have the deleteTourPlanEvents function available

const deleteTourPlanEvents = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await tourpackageService.deleteTourPlanEvents(req, id);

    res.status(200).json({
      success: true,
      message: 'Deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const tourpackageController = {
  getAllTourPackages,
  addpackage,
  mainimage,
  createPlaceVisit,
  createTourPlan,
  updateTourPlanEvents,
  deleteTourPlanEvents,
  getTourPlan,
  createInclusion,
  createExclusion,
  createBookingPolicy,
  createCancelationPolicy,
  createHighlights,
  addAddOnsController,
  getSingleTourPackages,
  createAlbumimage,
  updateAlbumController,
  updatePackage,
  updateMainImageController
}