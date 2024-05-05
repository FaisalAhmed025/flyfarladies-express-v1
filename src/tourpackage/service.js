import multer from "multer";
import pool from "../database/db";
import cron from 'node-cron'


// define image type
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};



const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    //  console.log(file.mimetype);
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) uploadError = null;
    cb(uploadError, null);
  },
});



export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});



const generatePackageId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "FFLPK" + Math.floor(Math.random() * 10000);
};

const visitedimageid = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "VI" + Math.floor(Math.random() * 10000);
};

const customiteneirary = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "IT" + Math.floor(Math.random() * 10000);
};

const custominclusion = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "I" + Math.floor(Math.random() * 10000);
};


const custommainid = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "MI" + Math.floor(Math.random() * 10000);
};

const customEXclusion = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "E" + Math.floor(Math.random() * 10000);
};

const customcancId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "C" + Math.floor(Math.random() * 10000);
};

const customBookingPOlicy = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "B" + Math.floor(Math.random() * 10000);
};

const AlbumImageID = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "A" + Math.floor(Math.random() * 10000);
};

const customHighlight = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "H" + Math.floor(Math.random() * 10000);
};


function logMessage() {
  console.log('Cron job executed at:', new Date().toLocaleString());
 }

const deactivatePackages = async () => {
  try {
    const connection = await pool.getConnection();
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
    console.log(currentDate)

    const updateQuery = `
      UPDATE tourpackage
      SET isActive = 0
      WHERE StartDate < ? AND isActive = 1
    `;

    await connection.execute(updateQuery, [currentDate]);
    connection.release();
    console.log('Packages deactivated successfully');
  } catch (error) {
    console.error('Error deactivating packages:', error);
  }
};

cron.schedule('* * * * *', async () => {
  console.log('Running package deactivation task...');
  logMessage()
  await deactivatePackages();
});


const addtourpackage = async (req, res) => {
  try {
    // Extract tour package details from request body
    const {
      MainTitle,
      SubTitle,
      Price,
      City,
      Discount,
      Location,
      Availability,
      StartDate,
      EndDate,
      TripType,
      TotalDuration,
      PackageOverview,
      Showpackage,
      Flight,
      Transport,
      Food,
      Hotel,
      Country,
      AvailableSeats,
      MinimumAge,
      MaximumAge,
      GirlsTrip,
      FamilyTrips,
      Adventure,
      FullyGuided,
      SelfGuided,
      Guide,
      CancellationDate,
      adult_base_price,
      child_base_price,
      infant_base_price,
      accommodation 
    } = req.body;

    // Assuming the file field name is 'coverImage'
    // Extract cover image details from the uploaded file

    const coverImage = req.publicImageLink;
    const packgeId = generatePackageId();
    console.log(packgeId)

    // Check if cover image is present
    if (!coverImage) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    // Execute raw SQL INSERT query to insert tour package details into database
    const values = [
      packgeId,
      MainTitle,
      SubTitle,
      Price,
      City,
      Discount,
      Location,
      Availability,
      StartDate,
      EndDate,
      TripType,
      TotalDuration,
      AvailableSeats,
      MinimumAge,
      MaximumAge,
      PackageOverview,
      Showpackage,
      Flight,
      Transport,
      Food,
      Hotel,
      Country,
      GirlsTrip,
      FamilyTrips,
      Adventure,
      FullyGuided,
      SelfGuided,
      Guide,
      CancellationDate,
      coverImage,
      adult_base_price,
      child_base_price,
      infant_base_price,
      accommodation 
    ];
    const [result] = await pool.query(
      `INSERT INTO tourpackage (PKID,
        MainTitle, SubTitle, Price,
        City, Discount, Location, Availability, StartDate, EndDate, TripType,
        TotalDuration, AvailableSeats, MinimumAge, MaximumAge, PackageOverview,
        Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips,
        Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage,   adult_base_price, 
        child_base_price, 
        infant_base_price,
        accommodation 
      ) 
      VALUES (?, ?,?,?,?,?,?,?,?,?,?,?, ?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
      values
    );
    console.log(values);
    return res.status(200).json({
      status: "success",
      message: "Travel package added successfully",
      Id: packgeId
    });
  } catch (error) {
    console.error("Error adding travel package:", error);
    res.status(500).json({ error: "Error adding travel package" });
  }
};

const getSingleTourPackages = async (PKID) => {
  try {
    const tourPackageQuery = `
    SELECT *
    FROM
      tourpackage
    WHERE
      tourpackage.PKID = ?;
  `;

    const [tourPackageResults] = await pool.execute(tourPackageQuery, [PKID]);
    console.log(tourPackageResults);
    if (tourPackageResults.length === 0) {
      return "Tourpackage not found" // Tour package not found
    }

    const tourPackagesData = [];
    const tourPackageData = {
      PKID: tourPackageResults[0].PKID,
      tourpack_id: tourPackageResults[0].PKID,
      MainTitle: tourPackageResults[0].MainTitle,
      SubTitle: tourPackageResults[0].SubTitle,
      TripType: tourPackageResults[0].TripType,
      Location: tourPackageResults[0].Location,
      StartDate: tourPackageResults[0].StartDate,
      EndDate: tourPackageResults[0].EndDate,
      trip_days: tourPackageResults[0].trip_days,
      trip_nights: tourPackageResults[0].trip_nights,
      AvailableSeats: tourPackageResults[0].AvailableSeats,
      MinimumAge: tourPackageResults[0].MinimumAge,
      MaximumAge: tourPackageResults[0].MaximumAge,
      TotalDuration: tourPackageResults[0].TotalDuration,
      adult_base_price: tourPackageResults[0].adult_base_price,
      child_base_price: tourPackageResults[0].child_base_price,
      infant_base_price: tourPackageResults[0].infant_base_price,
      Discount: tourPackageResults[0].Discount,
      PackageOverview: tourPackageResults[0].PackageOverview,
      booking_money_due_date: tourPackageResults[0].booking_money_due_date,
      first_installment_due_date:
        tourPackageResults[0].first_installment_due_date,
      second_installment_due_date:
        tourPackageResults[0].second_installment_due_date,
      booking_money: tourPackageResults[0].booking_money,
      first_installment: tourPackageResults[0].first_installment,
      second_installment: tourPackageResults[0].second_installment,
      total_booking_money:
        (parseInt(
          tourPackageResults[0].adult_base_price +
          tourPackageResults[0].infant_base_price +
          tourPackageResults[0].child_base_price
        ) *
          parseFloat(tourPackageResults[0].booking_money)) /
        100,
      total_first_installment:
        (parseInt(
          tourPackageResults[0].adult_base_price +
          tourPackageResults[0].infant_base_price +
          tourPackageResults[0].child_base_price
        ) *
          parseFloat(tourPackageResults[0].first_installment)) /
        100,
      total_second_installment:
        (parseInt(
          tourPackageResults[0].adult_base_price +
          tourPackageResults[0].infant_base_price +
          tourPackageResults[0].child_base_price
        ) *
          parseFloat(tourPackageResults[0].second_installment)) /
        100,
      GirlsTrip: tourPackageResults[0].GirlsTrip,
      Flight: tourPackageResults[0].Flight,
      accommodation: tourPackageResults[0].accommodation,
      Food: tourPackageResults[0].Food,
      Transport: tourPackageResults[0].Transport,
      guide: tourPackageResults[0].guide,
      Availability: tourPackageResults[0].Availability,
      show_on_this_on_home_page:
        tourPackageResults[0].show_on_this_on_home_page,
      popular_destination: tourPackageResults[0].popular_destination,
      day_trip: tourPackageResults[0].day_trip,
      night_out_trip: tourPackageResults[0].night_out_trip,
      FullyGuided: tourPackageResults[0].FullyGuided,
      Showpackage: tourPackageResults[0].Showpackage,
      family: tourPackageResults[0].family,
      SelfGuided: tourPackageResults[0].SelfGuided,
      friendly: tourPackageResults[0].friendly,
      child: tourPackageResults[0].child,
      aged: tourPackageResults[0].aged,
      adt_tax: tourPackageResults[0].adt_tax,
      chd_tax: tourPackageResults[0].chd_tax,
      inf_tax: tourPackageResults[0].inf_tax,
      coverImage: tourPackageResults[0].coverImage,
      total_price: parseInt(
        tourPackageResults[0].adult_base_price +
        tourPackageResults[0].infant_base_price +
        tourPackageResults[0].child_base_price
      ),
      Guide: tourPackageResults[0].Guide,
      City: tourPackageResults[0].City,
      Country:
        tourPackageResults[0].Country,
      CancellationDate: tourPackageResults[0].CancellationDate,
      main_image: [],
      tour_itinerary: [], // Change here from tour_itinerary to tour_plan
      booking_policy: [],
      installment:[],
      place_to_visit: [],
      inclusion: [],
      exclusion: [],
      highlights: [],
      cancellation_policy: [],
      albumImage: [],
      FAQs: [],
      add_ons:[]
    };
    const [
      getmainimg,
      tour_itinerary,
      visitedPlaces,
      inclusions,
      exclusion,
      highlights,
      bookingPolicy,
      installment,
      cancellationPolicy,
      albumImage,
      FAQS,
      add_ons

      // addOns,
    ] = await Promise.all([
      getmainimage(tourPackageData.PKID),
      getTourPlan(tourPackageData.PKID),
      getVisitedPlace(tourPackageData.PKID),
      getInclusion(tourPackageData.PKID),
      getExclusion(tourPackageData.PKID),
      getHighlights(tourPackageData.PKID),
      getBookingPolicy(tourPackageData.PKID),
      getinstallment(tourPackageData.PKID),
      getCancellationPolicy(tourPackageData.PKID),
      getalbumImage(tourPackageData.PKID),
      getFAQs(tourPackageData.PKID),
      getAddOns(tourPackageData.PKID),
    ]);

    tourPackageData.main_image = getmainimg;
    tourPackageData.tour_itinerary = tour_itinerary;
    tourPackageData.place_to_visit = visitedPlaces;
    tourPackageData.inclusion = inclusions;
    tourPackageData.exclusion = exclusion;
    tourPackageData.highlights = highlights;
    tourPackageData.booking_policy = bookingPolicy;
    tourPackageData.installment = installment;
    tourPackageData.cancellation_policy = cancellationPolicy;
    tourPackageData.albumImage = albumImage;
    tourPackageData.FAQs = FAQS
    tourPackageData.add_ons = add_ons;
    tourPackagesData.push(tourPackageData);
    return tourPackageData;
  } catch (error) {
    throw error;
  }
};


const getinstallment = async (PKID) => {
  try {
    console.log("id", PKID);
    const installment = `
    SELECT
    installment.InstallmentId,
    installment.tourpackageId,
    installment.FirstInstallmentdueDate,
    installment.SecondInstallmentdueDate,
    installment.ABookingAmount,
    installment.AFirstInstallmentAmount,
    installment.ASecondInstallmentAmount,
    installment.CBookingAmount,
    installment.CFirstInstallmentAmount,
    installment.CSecondInstallmentAmount,
    installment.ISecondInstallmentAmount,
    installment.IBookingAmount,
    installment.IFirstInstallmentAmount,
    installment.ThirdInstallmentdueDate
  FROM installment
  JOIN tourpackage ON installment.tourpackageId = tourpackage.PKID
  WHERE  installment.tourpackageId  = ?;  
    `;
    const [results] = await pool.execute(installment, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};


const getAllfaq = async(req,res)=>{
  const getquery = `SELECT * FROM FAQs`
  const [data] =  await pool.query(getquery)
  return res.status(200).json({
    status: true,
    data: data
  })
}

const getmainimage = async (PKID) => {
  try {
    console.log("id", PKID);
    const mainimage = `
    SELECT
    mainimage.imageId,
    mainimage.packageId,
    mainimage.imageurl
  FROM mainimage
  JOIN tourpackage ON mainimage.packageId = tourpackage.PKID
  WHERE mainimage.packageId = ? 
    `;
    const [results] = await pool.execute(mainimage, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};



const gettouritenerary = async (req, res) => {
  const id = req.params.id
  const tourplanquery = `SELECT * FROM tourplan WHERE id= ?`
  const [data] = await pool.query(tourplanquery, [id])
  return res.status(200).json({
    status: true,
    data: data
  })
}


const deletePackage = async (req, res) => {
  const id = req.params.PKID
  const deletequery = `DELETE FROM tourpackage WHERE PKID= ? `
  await pool.query(deletequery, [id])
  return res.status(200).json({
    status: 'success',
    message: 'package has removed'
  })
}



const deleteTourPlanEventsouritenerary = async (req, res) => {
  const id = req.params.id
  const tourplanquery = `DELETE FROM tourplan WHERE id= ?`
  const [data] = await pool.query(tourplanquery, [id])
  return res.status(200).json({
    status: true,
    message: 'Tourplan has removed'
  })
}


const deletTourItenerary = async (req, res) => {
  const id = req.params.id
  const tourplanquery = `DELETE FROM tour_itinerary WHERE id= ?`
  await pool.query(tourplanquery, [id])
  return res.status(200).json({
    status: true,
    message: 'tour plan has deleted.'
  })
}



const getTourPlan = async (PKID) => {
  try {
    // Retrieve tour plan details with order by uId in ascending order
    const tourPlanQuery = `
    SELECT
    tour_itinerary.id,
    tour_itinerary.tour_package_id,
    tour_itinerary.day_title,
    tour_itinerary.day_plan,
    tour_itinerary.staying_place,
    tour_itinerary.meal,
    tour_itinerary.breakFast,
    tour_itinerary.dinner
  FROM tour_itinerary
  JOIN tourpackage ON tour_itinerary.tour_package_id = tourpackage.PKID
  WHERE tour_itinerary.tour_package_id = ?;  
      `;
    const [tourPlanResults] = await pool.query(tourPlanQuery, [PKID]);

    return tourPlanResults;
  } catch (error) {
    throw error;
  } finally {
    // Release the database connection
  }
};





const getInclusion = async (PKID) => {
  try {
    const inclusionQuery = `
    SELECT
    inclusion.id,
    inclusion.tour_package_id,
    inclusion.inclusion
  FROM inclusion
  JOIN tourpackage ON inclusion.tour_package_id = tourpackage.PKID
  WHERE inclusion.tour_package_id = ?;  
`;
    const [results] = await pool.execute(inclusionQuery, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};
// Function to fetch exclusion data
export const getExclusion = async (PKID) => {
  try {
    const exclusionQuery = `
    SELECT
    exclusion.id,
    exclusion.tour_package_id,
    exclusion.exclusion
    FROM exclusion
  JOIN tourpackage ON exclusion.tour_package_id = tourpackage.PKID
  WHERE exclusion.tour_package_id = ?;  
`;
    const [results] = await pool.execute(exclusionQuery, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};

 const getAddOns = async (PKID) => {
  try {
    const getAddOns = `
    SELECT
    add_ons.id,
    add_ons.tour_package_id,
    add_ons.services,
    add_ons.cost,
    add_ons.description
  FROM add_ons
  JOIN tourpackage ON add_ons.tour_package_id = tourpackage.PKID
  WHERE add_ons.tour_package_id = ?;  
`;
    const [results] = await pool.execute(getAddOns, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getAAlladdOns = async (req,res) => {
  try {
    const getAddOns = `
    SELECT *
  FROM add_ons
`;
    const [results] = await pool.execute(getAddOns);
    return res.send({data:results});
  } catch (error) {
    throw error;
  }
};


export const getFAQs = async (PKID) => {
  try {
    const faqsquery = `
    SELECT 
    FAQs.id,
    FAQs.question,
    FAQs.answer
  FROM FAQs
  JOIN tourpackage ON FAQs.tour_package_id = tourpackage.PKID
  WHERE FAQs.tour_package_id = ?;  
`;
    const [results] = await pool.execute(faqsquery, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};
// Function to fetch cancellation policy data
export const getCancellationPolicy = async (PKID) => {
  try {
    const cancellationPolicyQuery = `
    SELECT
    cancellation_policy.id,
    cancellation_policy.tour_package_id,
    cancellation_policy.cancellation_policy
  FROM cancellation_policy
  JOIN tourpackage ON cancellation_policy.tour_package_id = tourpackage.PKID
  WHERE cancellation_policy.tour_package_id = ?;  
`;
    const [results] = await pool.execute(cancellationPolicyQuery, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};
// Function to fetch cancellation place visit data
const getVisitedPlace = async (PKID) => {
  try {
    const visitedPlace = `
    SELECT
    place_to_visit.id,
    place_to_visit.tour_package_id,
    place_to_visit.placetovisit_name,
    place_to_visit.place_image
  FROM place_to_visit
  JOIN tourpackage ON place_to_visit.tour_package_id = tourpackage.PKID
  WHERE place_to_visit.tour_package_id = ?;  
`;
    const [results] = await pool.execute(visitedPlace, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getalbumImage = async (PKID) => {
  try {
    const albumimages = `
    SELECT
  albumimage.AlbumId,
  albumimage.tourpackageId,
  albumimage.albumtitle,
  albumimage.albumcoverimageurl,
  albumimage.albumimageurl
  FROM albumimage
  JOIN tourpackage ON albumimage.tourpackageId = tourpackage.PKID
  WHERE albumimage.tourpackageId = ?;  
`;
    const [results] = await pool.execute(albumimages, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getHighlights = async (PKID) => {
  try {
    const highlightsQuery = `
      SELECT
        highlights.id,
        highlights.tour_package_id,
        highlights.highlights
      FROM
        highlights
        JOIN tourpackage ON highlights.tour_package_id = tourpackage.PKID
      WHERE
        highlights.tour_package_id = ?
    `;
    const [results] = await pool.execute(highlightsQuery, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getBookingPolicy = async (PKID) => {
  try {
    const bookingPolicyQuery = `
    SELECT
    booking_policy.id,
    booking_policy.tour_package_id,
    booking_policy.booking_policy
  FROM booking_policy
  JOIN tourpackage ON booking_policy.tour_package_id = tourpackage.PKID
  WHERE booking_policy.tour_package_id = ?;
`;
    const [results] = await pool.execute(bookingPolicyQuery, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};


const getAllTourPackages = async () => {
  try {
    const tourPackageQuery = `
    SELECT*
    FROM
      tourpackage;
  `;
    const [tourPackageResults] = await pool.execute(tourPackageQuery);
    console.log(tourPackageResults);
    return tourPackageResults;

  } catch (error) {
    throw error;
  }
};



const updateTourPackage = async (req, res) => {
  try {
    const packageId = req.params.PKID; // Assuming packageId is passed in the request parameters
    // Extract tour package details from request body

    const packageQuery = `SELECT * FROM tourpackage WHERE PKID = ?`;
    const [tourpackage] = await pool.query(packageQuery, [packageId]);

    if (tourpackage.length === 0) {
      return res.status(404).json({ message: 'Tour package not found' });
    }

    const {
      MainTitle,
      SubTitle,
      Price,
      City,
      Discount,
      Location,
      Availability,
      StartDate,
      EndDate,
      TripType,
      TotalDuration,
      PackageOverview,
      Showpackage,
      Flight,
      Transport,
      Food,
      Hotel,
      Country,
      AvailableSeats,
      MinimumAge,
      MaximumAge,
      GirlsTrip,
      FamilyTrips,
      Adventure,
      FullyGuided,
      SelfGuided,
      Guide,
      CancellationDate,
      adult_base_price,
      child_base_price,
      infant_base_price,
      accommodation 
      // Assuming coverImage is coming from request body
    } = req.body;


    const coverimage = req.publicImageLink


    // Check if cover image is present

    // Execute raw SQL UPDATE query to update tour package details in the database
    const values = [
      MainTitle,
      SubTitle,
      Price,
      City,
      Discount,
      Location,
      Availability,
      StartDate,
      EndDate,
      TripType,
      TotalDuration,
      AvailableSeats,
      MinimumAge,
      MaximumAge,
      PackageOverview,
      Showpackage,
      Flight,
      Transport,
      Food,
      Hotel,
      Country,
      GirlsTrip,
      FamilyTrips,
      Adventure,
      FullyGuided,
      SelfGuided,
      Guide,
      CancellationDate,
      coverimage,
      adult_base_price,
      child_base_price,
      infant_base_price,
      accommodation,
      packageId // Add packageId for WHERE clause
    ];

    const [result] = await pool.query(
      `UPDATE tourpackage SET 
        MainTitle = COALESCE(?, MainTitle), 
        SubTitle = COALESCE(?, SubTitle), 
        Price = COALESCE(?, Price), 
        City = COALESCE(?, City), 
        Discount = COALESCE(?, Discount), 
        Location = COALESCE(?, Location), 
        Availability = COALESCE(?, Availability), 
        StartDate = COALESCE(?, StartDate), 
        EndDate = COALESCE(?, EndDate), 
        TripType = COALESCE(?, TripType), 
        TotalDuration = COALESCE(?, TotalDuration), 
        AvailableSeats = COALESCE(?, AvailableSeats), 
        MinimumAge = COALESCE(?, MinimumAge), 
        MaximumAge = COALESCE(?, MaximumAge), 
        PackageOverview = COALESCE(?, PackageOverview), 
        Showpackage = COALESCE(?, Showpackage), 
        Flight = COALESCE(?, Flight), 
        Transport = COALESCE(?, Transport), 
        Food = COALESCE(?, Food), 
        Hotel = COALESCE(?, Hotel), 
        Country = COALESCE(?, Country), 
        GirlsTrip = COALESCE(?, GirlsTrip), 
        FamilyTrips = COALESCE(?, FamilyTrips), 
        Adventure = COALESCE(?, Adventure), 
        FullyGuided = COALESCE(?, FullyGuided), 
        SelfGuided = COALESCE(?, SelfGuided), 
        Guide = COALESCE(?, Guide), 
        CancellationDate = COALESCE(?, CancellationDate), 
        coverImage = COALESCE(?, coverImage),
        adult_base_price = COALESCE(?, adult_base_price),
        child_base_price = COALESCE(?, child_base_price),
        infant_base_price = COALESCE(?, infant_base_price),
        accommodation  =  COALESCE(?, accommodation)
      WHERE PKID = ?`,
      values
    );
    return res.status(200).json({ status: 'success', message: 'Tour package updated successfully', Id: packageId });
  } catch (error) {
    console.error("Error updating travel package:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};





const MainImage = async (req, PKID) => {
  let connection;
  try {
    console.log(PKID);
    const images = req.images;
    connection = await pool.getConnection();
    const packageQuery = "SELECT PKID  FROM tourpackage WHERE PKID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PKID]);
    console.log(packageResults);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const packageId = packageResults[0]?.PKID;
    console.log(packageId);

    // Insert each image URL into the cover_image table
    const insertQuery =
      "INSERT INTO  mainimage (imageId, imageurl, packageId) VALUES (?, ?, ?)";

    console.log(insertQuery);

    const insertResults = [];
    for (const imageurl of images) {
      const imageId = custommainid();
      const insertValues = [imageId, imageurl, packageId];
      console.log(insertValues);
      const [result] = await connection.execute(insertQuery, insertValues);
      insertResults.push({
        imageId: imageId,
        packageId: packageId,
        imageurl: imageurl,
      });
    }
    connection.release(); // Release the connection back to the pool
    return insertResults;
  } catch (error) {
    console.error(error);
    // Rollback the images if an error occurs
    for (const imageUrl of req.images) {
      await deleteImageFromURL(imageUrl);
    }
    throw new Error(error.message);
  }
};


const UpdateMainImage = async (req, imageId) => {
  const imageUrl = req.publicImageLink;
  if (!imageUrl) {
    return 'No image URL provided';
  }
  // connection = await pool.getConnection();
  const packageQuery = "SELECT imageId FROM mainimage WHERE imageId = ?";
  const [packageResults] = await pool.query(packageQuery, [imageId]);

  if (packageResults.length === 0) {
    throw new Error("image not found.");
  }

  const Id = packageResults[0]?.imageId;
  const updateQuery = `UPDATE mainimage  SET imageurl = ?
WHERE imageId = ?`;
  console.log(updateQuery);
  const values = [imageUrl, Id];
  const [result] = await pool.query(updateQuery, values);
  return result;

};

const deletemainimage = async (req, res) => {
  const id = req.params.imageId
  const deletequery = `DELETE FROM mainimage WHERE  imageId= ? `
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'image has deleted'
  })
}


const createPlaceVisit = async (req, PKID) => {
  let connection;
  try {
    const images = req.images;
    let placetovisit_names = req.body?.placetovisit_name;
    connection = await pool.getConnection();
    const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PKID]);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }
    const tourPackageId = packageResults[0]?.PKID;

    // If placetovisit_names is a string, convert it to an array
    if (typeof placetovisit_names === "string") {
      placetovisit_names = placetovisit_names.split(",");
    }

    // Insert each image URL into the place_to_visit table
    const insertQuery =
      "INSERT INTO place_to_visit (id, tour_package_id, placetovisit_name, place_image) VALUES (?, ?, ?, ?)";

    const insertResults = [];
    for (let i = 0; i < images.length; i++) {
      const placeVisitId = visitedimageid();
      const insertValues = [
        placeVisitId,
        tourPackageId,
        placetovisit_names[i], // Use the specific name at index i, or an empty string if not available
        images[i],
      ];
      console.log(insertValues);
      const [result] = await connection.execute(insertQuery, insertValues);
      insertResults.push({
        id: placeVisitId,
        tour_package_id: tourPackageId,
        placetovisit_name: placetovisit_names[i] || "", // Use the specific name at index i, or an empty string if not available
        place_image: images[i],
      });
    }
    connection.release(); // Release the connection back to the pool
    return insertResults;
  } catch (error) {
    console.error(error);
    // Rollback the images if an error occurs
    for (const image of req.images) {
      await deleteImageFromURL(image);
    }
    throw new Error(error.message);
  }
};


const UpdatevisitedImage = async (req, res, id) => {
  const { placetovisit_name } = req.body;
  const imageUrl = req.publicImageLink;

  if (!imageUrl) {
    return 'No image URL provided';
  }

  // connection = await pool.getConnection();
  const packageQuery = "SELECT id FROM place_to_visit WHERE id = ?";
  const [packageResults] = await pool.query(packageQuery, [id]);

  if (packageResults.length === 0) {
    throw new Error("Album not found.");
  }

  const Id = packageResults[0]?.id;
  const updateQuery = `UPDATE place_to_visit SET place_image = ?,
  placetovisit_name = ? 
WHERE  id = ?`;
  console.log(updateQuery);
  const values = [imageUrl, placetovisit_name, Id];
  const [result] = await pool.query(updateQuery, values);
  return res.send({ status: 'success', message: " image has updated" });

};


const addInstallment = async (req, PKID) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const updatedOrInsertedInstallments = [];

    const installment = req.body;

    const packageQuery = `SELECT PKID FROM tourpackage WHERE PKID = ?`;
    const [packageResults] = await connection.execute(packageQuery, [PKID]);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const tour_package_id = packageResults[0].PKID;

    const {
      InstallmentId,
      FirstInstallmentdueDate,
      SecondInstallmentdueDate,
      ThirdInstallmentdueDate,
      ABookingAmount,
      AFirstInstallmentAmount,
      ASecondInstallmentAmount,
      CBookingAmount,
      CFirstInstallmentAmount,
      CSecondInstallmentAmount,
      IBookingAmount,
      IFirstInstallmentAmount,
      ISecondInstallmentAmount
    } = installment;
    if (InstallmentId) {
      const updateQuery = `UPDATE installment SET 
                            FirstInstallmentdueDate = ?,
                            SecondInstallmentdueDate = ?,
                            ThirdInstallmentdueDate = ?,
                            ABookingAmount = ?,
                            AFirstInstallmentAmount = ?,
                            ASecondInstallmentAmount = ?,
                            CBookingAmount = ?,
                            CFirstInstallmentAmount = ?,
                            CSecondInstallmentAmount = ?,
                            IBookingAmount = ?,
                            IFirstInstallmentAmount = ?,
                            ISecondInstallmentAmount = ?
                            WHERE InstallmentId = ?`;

      await connection.execute(updateQuery, [FirstInstallmentdueDate, SecondInstallmentdueDate, ThirdInstallmentdueDate,
        ABookingAmount, AFirstInstallmentAmount, ASecondInstallmentAmount, CBookingAmount, CFirstInstallmentAmount,
        CSecondInstallmentAmount, IBookingAmount, IFirstInstallmentAmount, ISecondInstallmentAmount, InstallmentId]);

      updatedOrInsertedInstallments.push({
        InstallmentId,
        status: true,
        message: "Installment updated successfully"
      });
    } else {
     // Define your function to generate a unique ID for installment
      const insertQuery = `INSERT INTO installment (FirstInstallmentdueDate, SecondInstallmentdueDate, 
                          ThirdInstallmentdueDate, ABookingAmount, AFirstInstallmentAmount, ASecondInstallmentAmount,
                          CBookingAmount, CFirstInstallmentAmount, CSecondInstallmentAmount, IBookingAmount,
                          IFirstInstallmentAmount, ISecondInstallmentAmount, tourpackageId) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      await connection.execute(insertQuery, [FirstInstallmentdueDate, SecondInstallmentdueDate, ThirdInstallmentdueDate,
        ABookingAmount, AFirstInstallmentAmount, ASecondInstallmentAmount, CBookingAmount, CFirstInstallmentAmount,
        CSecondInstallmentAmount, IBookingAmount, IFirstInstallmentAmount, ISecondInstallmentAmount, tour_package_id]);

      updatedOrInsertedInstallments.push({
        status: true,
        message: "New installment inserted successfully"
      });
    }

    return updatedOrInsertedInstallments;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


const createAlbumImage = async (req, res, PKID) => {
  let connection;
  const { albumtitle } = req.body;
  const albumimageurl = [];
  if (req.files.albumimageurl) {
    for (let i = 0; i < req.files.albumimageurl.length; i++) {
      // Handle each image here, upload to S3 or save locally
      // Example: const imageUrl = await uploadImageToS3(req.files.blogimages[i]);
      const imageUrl = req.imageLink
      const imageId = i + 1// Assuming you have an id for each image
      albumimageurl.push({ id: imageId, url: imageUrl });
    }
  }


  let albumcoverimageurl;
  if (req.files.albumcoverimageurl) {
    // Handle second image here
    // Example: const secondImageUrl = await uploadImageToS3(req.files.secondimage[0]);
    albumcoverimageurl = req.imageLink
  }

  connection = await pool.getConnection();
  const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
  const [packageResults] = await connection.execute(packageQuery, [PKID]);

  if (packageResults.length === 0) {
    throw new Error("Tour package not found.");
  }

  const tourPackageId = packageResults[0]?.PKID;
  const newalbumquery = `INSERT INTO albumimage (albumimageurl, albumcoverimageurl, albumtitle , tourpackageId) values(?,?,?,?)`;

  const values = [JSON.stringify(albumimageurl), albumcoverimageurl, albumtitle, tourPackageId];

  await pool.query(newalbumquery, values);
  return res.status(200).json({ status: 'success', message: 'album created successfully' });

};

const UpdateAlbumImage = async (req, AlbumId) => {
  const { albumtitle } = req.body;
  const imageUrl = req.publicImageLink;

  if (!imageUrl) {
    return 'No image URL provided';
  }

  // connection = await pool.getConnection();
  const packageQuery = "SELECT AlbumId FROM albumimage WHERE AlbumId = ?";
  const [packageResults] = await pool.query(packageQuery, [AlbumId]);

  if (packageResults.length === 0) {
    throw new Error("Album not found.");
  }

  const Id = packageResults[0]?.AlbumId;
  const updateQuery = `UPDATE albumimage  SET albumcoverimageurl = ?,
    albumtitle = ? 
  WHERE AlbumId = ?`;
  console.log(updateQuery);
  const values = [imageUrl, albumtitle, Id];
  const [result] = await pool.query(updateQuery, values);
  return result;

};



const updatealbumIinnermage = async (req, res) => {
  try {
    const id = req.params.AlbumId;
    const urlid = req.params.id;
    const newImageUrl = req.publicImageLink;

    const [albumimage] = await pool.query('SELECT * FROM albumimage WHERE AlbumId = ?', [id])

    if (albumimage.length === 0) {
      return res.status(404).json({ message: 'image  not found' });
    }

    let albumimageData = albumimage[0];
    const albumimageurls = albumimageData.albumimageurl;

    for (let i = 0; i < albumimageurls.length; i++) {
      const image = albumimageurls[i]
      console.log(image)
      if (image.id === Number(urlid)) {
        console.log('now')
        albumimageurls[i].url = newImageUrl;
      }

    }
    console.log({ albumimageurls })

    const [data] = await pool.query('UPDATE albumimage SET albumimageurl = ? WHERE  AlbumId = ?', [JSON.stringify(albumimageurls), id]);

    console.log(data)
    return res.status(200).json({ status: 'success', message: 'Image URL updated successfully' });
  } catch (error) {
    console.error('Error updating image URL:', error);
    return res.status(500).json({ status: 'error', message: 'An error occurred while updating image URL' });
  }
};

//delete image
export async function deleteImageFromURL(url) {
  try {
    if (!url) {
      console.error("Invalid URL: ", url);
      return;
    }
    const parsedUrl = new URL(url);
    const bucketName = parsedUrl.hostname.split(".")[0];
    const pathSegments = decodeURIComponent(parsedUrl.pathname).split("/");
    const objectName = pathSegments[pathSegments.length - 1]; // Get the last segment
    console.table({ bucketName, objectName });
    const storage = new Storage({
      projectId: "quickticketsb2b-nodejs",
      keyFilename: "key.json",
    });
    await storage.bucket("b2bnodeimages").file(objectName).delete();
    // console.log(`Image deleted: gs://${config.gcp.bucket}/${objectName}`);
  } catch (error) {
    console.error(`Error deleting image: ${error}`);
  }
}

const createTourPlan = async (req) => {
  let connection;
  try {
    connection = await pool.getConnection();
    // Iterate over the array of tour plan data
    for (const tourPlanData of req.body.tourplanData) {
      const { day_title, day_plan, stayingPlace, breakFast, meal, dinner, id } = tourPlanData; // Extract ID from tourPlanData
      // Retrieve tour package ID from the database
      const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
      const [packageResults] = await connection.execute(packageQuery, [
        req.params.PKID,
      ]);
      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }
      const tourPackageId = packageResults[0]?.PKID;

      if (id) {
        // Check if ID is provided
        // Update the tour plan in the database
        await pool.query(
          `UPDATE tour_itinerary SET day_title = ?, day_plan = ?, staying_place=?, breakFast=?, meal=?, dinner=? WHERE id = ?`,
          [day_title, day_plan, stayingPlace, breakFast, meal, dinner, id]
        );
      } else {
        // Generate a unique ID for the tour plan
        const generatedId = generatePackageId();
        // Prepare values for the INSERT query
        const values = [generatedId, tourPackageId, day_title, day_plan, stayingPlace, breakFast, meal, dinner];

        // Execute the INSERT query to add the tour plan to the database
        const [result] = await pool.query(
          `INSERT INTO tour_itinerary (id, tour_package_id, day_title, day_plan, staying_place, breakFast, meal, dinner) VALUES (?, ?, ?, ?,?,?,?,?)`,
          values
        );
        updatedOrInsertedTourPlans.push(result); // Push the inserted record
      }
    }
    // Return the result or updatedOrInsertedTourPlans array depending on your requirement
    return updatedOrInsertedTourPlans;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const createInclusion = async (req, PKID) => {
  try {
    const inclusions = req.body;

    // if (!inclusions || !Array.isArray(inclusions) || inclusions.length === 0) {
    //   throw new Error("Inclusion data is required and should be an array.");
    // }

    const connection = await pool.getConnection();

    const updatedOrInsertedInclusions = [];

    for (const inclusion of inclusions) {
      const { id, inclusionText } = inclusion; // Assuming each object in the array has properties named 'id' and 'inclusionText'

      if (!inclusionText) {
        throw new Error("Inclusion text is required for each object.");
      }

      const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
      const [packageResults] = await connection.execute(packageQuery, [PKID]);

      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }

      const tourPackageId = packageResults[0].PKID;

      if (id) {
        // If ID is provided, update the existing inclusion
        const updateQuery = "UPDATE inclusion SET inclusion = ? WHERE id = ?";
        await connection.execute(updateQuery, [inclusionText, id]);
        updatedOrInsertedInclusions.push({
          id,
          status: true,
          message: "Inclusion updated successfully"
        });
      } else {
        // If ID is not provided, it's a new inclusion to be inserted
        const newId = custominclusion();
        const insertQuery = "INSERT INTO inclusion (id, tour_package_id, inclusion) VALUES (?, ?, ?)";
        await connection.execute(insertQuery, [newId, tourPackageId, inclusionText]);
        updatedOrInsertedInclusions.push({
          id: newId,
          status: "success",
          message: "New inclusion inserted successfully"
        });
      }
    }

    connection.release();
    return updatedOrInsertedInclusions;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};


const createExclusion = async (req, PKID) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const updatedOrInsertedExclusions = [];
    const exclusions = req.body;

    // if (!exclusions || !Array.isArray(exclusions) || exclusions.length === 0) {
    //   throw new Error("Exclusion data is required as an array of objects.");
    // }

    console.log(exclusions);

    const packageQuery = `SELECT PKID FROM tourpackage WHERE PKID = ?`;
    const [packageResults] = await connection.execute(packageQuery, [PKID]);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const tour_package_id = packageResults[0].PKID;

    for (const exclusion of exclusions) {
      const { id, exclusionText } = exclusion; // Assuming each object in the array has properties named 'id' and 'inclusionText'

      if (!exclusionText) {
        throw new Error("exclusion text is required for each object.");
      }

      const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
      const [packageResults] = await connection.execute(packageQuery, [PKID]);

      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }

      const tourPackageId = packageResults[0].PKID;

      if (id) {
        // If ID is provided, update the existing inclusion
        const updateQuery = "UPDATE exclusion SET exclusion = ? WHERE id = ?";
        await connection.execute(updateQuery, [exclusionText, id]);
        updatedOrInsertedExclusions.push({
          id,
          status: true,
          message: "Inclusion updated successfully"
        });
      } else {
        // If ID is not provided, it's a new inclusion to be inserted
        const newId = custominclusion();
        const insertQuery = "INSERT INTO exclusion (id, tour_package_id, exclusion) VALUES (?, ?, ?)";
        await connection.execute(insertQuery, [newId, tourPackageId, exclusionText]);
        updatedOrInsertedExclusions.push({
          id: newId,
          status: true,
          message: "New exclusion inserted successfully"
        });
      }
    }

  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


const deleteexclusion = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM exclusion WHERE id= ? `
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'inclusion has removed'
  })
}

const deleteinclusion = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM inclusion WHERE id= ? `
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'inclusion has removed'
  })
}


const createBookingPolicy = async (req, PKID) => {
  try {
    const bookingPolicies = req.body;
    if (!bookingPolicies || !Array.isArray(bookingPolicies) || bookingPolicies.length === 0) {
      throw new Error("Booking policy data is required as an array of objects.");
    }

    const connection = await pool.getConnection();

    const updatedOrInsertedPolicies = [];

    for (const policyObj of bookingPolicies) {
      const { id, booking_policy } = policyObj;

      if (!booking_policy) {
        throw new Error("Booking policy text is required for each object.");
      }

      const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
      const [packageResults] = await connection.execute(packageQuery, [PKID]);

      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }

      const tour_package_id = packageResults[0].PKID;

      if (id) {
        // If ID is provided, update the existing booking policy
        const updateQuery = "UPDATE booking_policy SET booking_policy = ? WHERE id = ?";
        await connection.execute(updateQuery, [booking_policy, id]);
        updatedOrInsertedPolicies.push({
          id,
          status: true,
          message: "Booking policy updated successfully"
        });
      } else {
        // If ID is not provided, it's a new booking policy to be inserted
        const newId = customBookingPOlicy();
        const insertQuery = "INSERT INTO booking_policy (id, tour_package_id, booking_policy) VALUES (?, ?, ?)";
        await connection.execute(insertQuery, [newId, tour_package_id, booking_policy]);
        updatedOrInsertedPolicies.push({
          id: newId,
          status: true,
          message: "New booking policy inserted successfully"
        });
      }
    }
    connection.release();
    return updatedOrInsertedPolicies;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const deletepolicy = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM booking_policy WHERE id= ? `
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'booking policy has deleted'
  })
}

const deleteAddons = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM add_ons WHERE id= ? `
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'Addons has deleted'
  })
}

const createCancelationPolicy = async (req, PKID) => {
  try {
    const cancellationPolicies = req.body;

    if (
      !cancellationPolicies ||
      !Array.isArray(cancellationPolicies) ||
      cancellationPolicies.length === 0
    ) {
      throw new Error(
        "Cancellation policies are required as an array of objects."
      );
    }

    const connection = await pool.getConnection();
    const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PKID]);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const tour_package_id = packageResults[0].PKID;

    const insertResults = [];

    for (const cancellationObj of cancellationPolicies) {
      const { id, cancellation_policy } = cancellationObj;

      if (!cancellation_policy) {
        throw new Error("Cancellation policy text is required for each object.");
      }

      if (id) {
        // If ID is provided, update the existing cancellation policy
        const updateQuery = "UPDATE cancellation_policy SET cancellation_policy = ? WHERE id = ? AND tour_package_id = ?";
        await connection.execute(updateQuery, [cancellation_policy, id, tour_package_id]);
        insertResults.push({
          id,
          status: true,
          message: "Cancellation policy updated successfully"
        });
      } else {
        // If ID is not provided, it's a new cancellation policy to be inserted
        const newId = customcancId();
        const insertQuery = "INSERT INTO cancellation_policy (id, tour_package_id, cancellation_policy) VALUES (?, ?, ?)";
        await connection.execute(insertQuery, [newId, tour_package_id, cancellation_policy]);
        insertResults.push({
          id: newId,
          status: true,
          message: "New cancellation policy inserted successfully"
        });
      }
    }
    connection.release();

    return insertResults;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};


const cancellationPolicy = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM cancellation_policy WHERE id= ? `
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'cancellationPolicy has deleted'
  })
}


const createHighlights = async (req, PKID) => {
  try {
    const highlights = req.body;
    if (!highlights || !Array.isArray(highlights) || highlights.length === 0) {
      throw new Error("Highlights are required as an array of objects.");
    }

    const connection = await pool.getConnection();
    const updatedOrInsertedHighlights = [];

    for (const highlight of highlights) {
      const { id, highlights } = highlight;

      if (!highlights) {
        throw new Error("Highlight text is required for each object.");
      }

      const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ? ";
      const [packageResults] = await connection.execute(packageQuery, [PKID]);

      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }

      const tour_package_id = packageResults[0].PKID;

      console.log(PKID)

      if (id) {
        // If ID is provided, update the existing highlight
        const updateQuery = "UPDATE highlights SET highlights = ? WHERE id = ?";
        await connection.execute(updateQuery, [highlights, id]);
        updatedOrInsertedHighlights.push({
          id,
          status: true,
          message: "Highlight updated successfully"
        });
      } else {
        // If ID is not provided, it's a new highlight to be inserted
        const newId = customHighlight();
        const insertQuery = "INSERT INTO highlights (id, tour_package_id, highlights) VALUES (?, ?, ?)";
        await connection.execute(insertQuery, [newId, tour_package_id, highlights]);
        updatedOrInsertedHighlights.push({
          id: newId,
          status: true,
          message: "New highlight inserted successfully"
        });
      }
    }
    connection.release();
    return updatedOrInsertedHighlights;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};


const deleteHighlight = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM highlights WHERE id= ? `
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'Highlight has deleted'
  })
}

const deleteFAQ = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM FAQs WHERE id= ? `
  await pool.query(deletequery, [id])

  return res.status(200).json({
    status: true,
    message: 'FAQs has deleted'
  })
}

const createAddOns = async (tour_package_id, req) => {
  try {
    const addOns = req.body.add_ons; // Corrected key to match the Postman request
    if (!addOns || !Array.isArray(addOns) || addOns.length === 0) {
      throw new Error("Add-ons are required as an array of objects.");
    }
    const connection = await pool.getConnection();
    const updatedOrInsertedAddOns = [];

    for (const addOn of addOns) {
      const { id, service, description, cost} = addOn;
      if (!service || !description || !cost) { // Corrected !title to !cost
        throw new Error("Service, description, and cost are required for each add-on object.");
      }

      const insertQuery =
        "INSERT INTO add_ons (services, description, tour_package_id, cost) VALUES (?, ?, ?, ?)";

      if (id) {
        // If ID is provided, update the existing add-on
        const updateQuery = "UPDATE add_ons SET services = ?, description = ?, cost = ? WHERE id = ?";
        await connection.execute(updateQuery, [service, description, cost, id]);
        updatedOrInsertedAddOns.push({
          id,
          status: true,
          message: "Add-on updated successfully"
        });
      } else {
        // If ID is not provided, it's a new add-on to be inserted// Assuming Addonservice generates a new ID
        const [result] = await connection.execute(insertQuery, [ service, description, tour_package_id, cost]);
        updatedOrInsertedAddOns.push({
          status: true,
          message: "New add-on inserted successfully"
        });
      }
    }
    connection.release();
    return updatedOrInsertedAddOns;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTourPlanEvents = async (req, id) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const eventIds = req.body;
    const deletedEvents = [];

    for (const eventId of eventIds) {
      const tourPlanEventsDeleteQuery = `
        DELETE FROM tour_plan_events
        WHERE id = ? AND tour_plan_id =?
      `;

      const [deleteResult] = await connection.query(tourPlanEventsDeleteQuery, [
        eventId.id,
        id,
      ]);

      if (deleteResult.affectedRows > 0) {
        deletedEvents.push({ id: eventId.id });
      }
    }
    await connection.commit();

    return deletedEvents;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const AddFAQs = async (req, res) => {
  try {
    const faqsData = req.body.faqsData; // Array of objects containing tour package ID and FAQs
    // Validate if faqsData is provided
    if (!faqsData || !Array.isArray(faqsData) || faqsData.length === 0) {
      return res.status(400).json({ message: "Please provide an array of FAQs data." });
    }

    // Insert FAQs for each tour package
    for (const faqData of faqsData) {
      const { pkid, faqs } = faqData;

      // Check if the tour package exists
      const packagequery = `SELECT * FROM tourpackage WHERE PKID=?`;
      const [tourPackage] = await pool.query(packagequery, [pkid]);

      if (!tourPackage.length) {
        return res.status(404).json({ message: `Tour package with ID ${pkid} not found.` });
      }

      if (Array.isArray(faqs) && faqs.length > 0) {
        // Insert multiple FAQs for the current tour package
        for (const faq of faqs) {
          const { question, answer } = faq;
          const insertQuery = `INSERT INTO FAQs(tour_package_id, question, answer) VALUES(?,?,?)`;
          await pool.query(insertQuery, [pkid, question, answer]);
        }
      } else if (faqs && typeof faqs === "object") {
        // Insert single FAQ for the current tour package
        const { question, answer } = faqs;
        const insertQuery = `INSERT INTO FAQs(tour_package_id, question, answer) VALUES(?,?,?)`;
        await pool.query(insertQuery, [pkid, question, answer]);
      }
    }
    return res.status(200).json({status:true, message: "FAQs added successfully to tour packages." });
  } catch (error) {
    console.error("Error adding FAQs:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export const tourpackageService = {
  deleteinclusion,
  getSingleTourPackages,
  deletePackage,
  getAllfaq,
  addtourpackage,
  addInstallment,
  AddFAQs,
  getAllTourPackages,
  updateTourPackage,
  MainImage,
  deletemainimage,
  createPlaceVisit,
  createTourPlan,
  gettouritenerary,
  deletTourItenerary,
  deleteHighlight,
  getTourPlan,
  deleteTourPlanEvents,
  createInclusion,
  getAAlladdOns,
  createExclusion,
  deleteFAQ,
  deleteexclusion,
  createBookingPolicy,
  deletepolicy,
  deleteAddons,
  createCancelationPolicy,
  createHighlights,
  createAddOns,
  getSingleTourPackages,
  getBookingPolicy,
  createAlbumImage,
  UpdateAlbumImage,
  updateTourPackage,
  cancellationPolicy,
  UpdateMainImage,
  updatealbumIinnermage,
  UpdatevisitedImage
};