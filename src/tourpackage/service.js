import multer from "multer";
import pool from "../database/db";


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

const Addonservice = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "A" + Math.floor(Math.random() * 10000);
};


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
      PricePerAdult,
      PricePerChild,
      PricePerInfant,
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
      booking_money_due_date, 
      first_installment_due_date, 
      second_installment_due_date,
      booking_money, 
      first_installment, 
      second_installment, 
    } = req.body;

    // Assuming the file field name is 'coverImage'
    // Extract cover image details from the uploaded file
    const coverImage = req.publicImageLink;
    const packgeId = generatePackageId();

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
      PricePerAdult,
      PricePerChild,
      PricePerInfant,
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
      booking_money_due_date, 
      first_installment_due_date, 
      second_installment_due_date,
      booking_money, 
      first_installment, 
      second_installment, 
    ];
    const [result] = await pool.query(
      `INSERT INTO tourpackage (PkId,
        MainTitle, SubTitle, Price, PricePerAdult, PricePerChild, PricePerInfant,
        City, Discount, Location, Availability, StartDate, EndDate, TripType,
        TotalDuration, AvailableSeats, MinimumAge, MaximumAge, PackageOverview,
        Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips,
        Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage,   adult_base_price, 
        child_base_price, 
        infant_base_price, 
        booking_money_due_date, 
        first_installment_due_date, 
        second_installment_due_date,
        booking_money, 
        first_installment, 
        second_installment
      ) 
      VALUES (?, ?,?,?,?,?,?,?,?,?,?,?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
      values
    );
    console.log(values);
    return res.status(200).json({
      status: "success",
      message: "Travel package added successfully",
    });
  } catch (error) {
    console.error("Error adding travel package:", error);
    res.status(500).json({ error: "Error adding travel package" });
  }
};



const getSingleTourPackages = async (PkID) => {
  console.log("i am id", PkID);
  try {
    const tourPackageQuery = `
    SELECT
      tourpackage.PkID AS tour_package_id,
      tourpackage.PkID,
      tourpackage.MainTitle,
      tourpackage.TripType,
      tourpackage.Location,
      tourpackage.StartDate,
      tourpackage.EndDate,
      tourpackage.AvailableSeats,
      tourpackage.PricePerAdult,
      tourpackage.PricePerChild,
      tourpackage.PricePerInfant,
      tourpackage.GirlsTrip,
      tourpackage.PackageOverview,
      tourpackage.MinimumAge,
      tourpackage.MaximumAge,
      tourpackage.Price,
      tourpackage.City,
      tourpackage.Discount,
      tourpackage.SelfGuided,
      tourpackage.Flight,
      tourpackage.Food,
      tourpackage.Transport,
      tourpackage.FullyGuided,
      tourpackage.coverImage  -- Assuming there's a column in main_image for the image URL
    FROM
      tourpackage

    WHERE
      tourpackage.PkID = ?;
  `;

    const [tourPackageResults] = await pool.execute(tourPackageQuery, [PkID]);

    console.log(tourPackageResults);
    if (tourPackageResults.length === 0) {
      return null; // Tour package not found
    }


    const tourPackagesData = [];
    const tourPackageData = {
      PkID: tourPackageResults[0].PkID,
      tourpack_id: tourPackageResults[0].tourpack_id,
      MainTitle: tourPackageResults[0].MainTitle,
      TripType: tourPackageResults[0].TripType,
      Location: tourPackageResults[0].Location,
      StartDate: tourPackageResults[0].StartDate,
      EndDate: tourPackageResults[0].EndDate,
      trip_days: tourPackageResults[0].trip_days,
      trip_nights: tourPackageResults[0].trip_nights,
      AvailableSeats: tourPackageResults[0].AvailableSeats,
      MinimumAge: tourPackageResults[0].MinimumAge,
      MaximumAge: tourPackageResults[0].MaximumAge,
      PricePerAdult: tourPackageResults[0].PricePerAdult,
      PricePerChild: tourPackageResults[0].PricePerChild,
      PricePerInfant: tourPackageResults[0].PricePerInfant,
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
      country:
        tourPackageResults[0].country &&
          tourPackageResults[0].country[0].country
          ? tourPackageResults[0].country[0].country.map((entry) => ({
            city: entry.city,
            country: entry.country,
          }))
          : [],
      main_image: [],
      tour_plan: [], // Change here from tour_itinerary to tour_plan
      booking_policy: [],
      place_to_visit: [],
      inclusion: [],
      exclusion: [],
      highlights: [],
      cancellation_policy: [],
      albumImage: [],
    };
    const [
      getmainimg,
      tourPlan,
      visitedPlaces,
      inclusions,
      exclusion,
      highlights,
      bookingPolicy,
      cancellationPolicy,
      albumImage,
      addOns,
    ] = await Promise.all([
      getmainimage(tourPackageData.PkID),
      getTourPlan(tourPackageData.PkID),
      getVisitedPlace(tourPackageData.PkID),
      getInclusion(tourPackageData.PkID),
      getExclusion(tourPackageData.PkID),
      getHighlights(tourPackageData.PkID),
      getBookingPolicy(tourPackageData.PkID),
      getCancellationPolicy(tourPackageData.PkID),
      getalbumImage(tourPackageData.PkID),

      // getAddOns(tourPackageData.id),
    ]);

    tourPackageData.main_image = getmainimg;
    tourPackageData.tour_plan = tourPlan;
    tourPackageData.place_to_visit = visitedPlaces;
    tourPackageData.inclusion = inclusions;
    tourPackageData.exclusion = exclusion;
    tourPackageData.highlights = highlights;
    tourPackageData.booking_policy = bookingPolicy;
    tourPackageData.cancellation_policy = cancellationPolicy;
    tourPackageData.albumImage = albumImage;
    // tourPackageData.add_ons = addOns;
    tourPackagesData.push(tourPackageData);
    return tourPackageData;
  } catch (error) {
    throw error;
  }
};



const getmainimage = async (PkID) => {
  try {
    console.log("id", PkID);
    const mainimage = `
    SELECT
    mainimage.imageId,
    mainimage.packageId,
    mainimage.imageurl
  FROM mainimage
  JOIN tourpackage ON mainimage.packageId = tourpackage.PkID
  WHERE mainimage.packageId = ?;  
    `;
    const [results] = await pool.execute(mainimage, [PkID]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getTourPlan = async (PkID) => {
  try {
    // Retrieve tour plan details with order by uId in ascending order
    const tourPlanQuery = `
    SELECT
    tourplan.id,
    tourplan.tour_package_id,
    tourplan.day_title,
    tourplan.day_plan
  FROM tourplan
  JOIN tourpackage ON tourplan.tour_package_id = tourpackage.PkID
  WHERE tourplan.tour_package_id = ?;  
      `;

    const [tourPlanResults] = await pool.query(tourPlanQuery, [PkID]);

    return tourPlanResults;
  } catch (error) {
    throw error;
  } finally {
    // Release the database connection
  }
};

const getInclusion = async (PkID) => {
  try {
    const inclusionQuery = `
    SELECT
    inclusion.id,
    inclusion.tour_package_id,
    inclusion.inclusion
  FROM inclusion
  JOIN tourpackage ON inclusion.tour_package_id = tourpackage.PkID
  WHERE inclusion.tour_package_id = ?;  
`;
    const [results] = await pool.execute(inclusionQuery, [PkID]);
    return results;
  } catch (error) {
    throw error;
  }
};
// Function to fetch exclusion data
export const getExclusion = async (PkID) => {
  try {
    const exclusionQuery = `
    SELECT
    exclusion.id,
    exclusion.tour_package_id,
    exclusion.exclusion
  FROM exclusion
  JOIN tourpackage ON exclusion.tour_package_id = tourpackage.PkID
  WHERE exclusion.tour_package_id = ?;  
`;

    const [results] = await pool.execute(exclusionQuery, [PkID]);
    return results;
  } catch (error) {
    throw error;
  }
};
// Function to fetch cancellation policy data
export const getCancellationPolicy = async (PkID) => {
  try {
    const cancellationPolicyQuery = `
    SELECT
    cancellation_policy.id,
    cancellation_policy.tour_package_id,
    cancellation_policy.cancellation_policy
  FROM cancellation_policy
  JOIN tourpackage ON cancellation_policy.tour_package_id = tourpackage.PkID
  WHERE cancellation_policy.tour_package_id = ?;  
`;
    const [results] = await pool.execute(cancellationPolicyQuery, [PkID]);
    return results;
  } catch (error) {
    throw error;
  }
};
// Function to fetch cancellation place visit data
const getVisitedPlace = async (PkID) => {
  try {
    const visitedPlace = `
    SELECT
    place_to_visit.id,
    place_to_visit.tour_package_id,
    place_to_visit.placetovisit_name,
    place_to_visit.place_image
  FROM place_to_visit
  JOIN tourpackage ON place_to_visit.tour_package_id = tourpackage.PkID
  WHERE place_to_visit.tour_package_id = ?;  
`;
    const [results] = await pool.execute(visitedPlace, [PkID]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getalbumImage = async (PkID) => {
  try {
    const albumimages = `
    SELECT
  albumimage.AlbumId,
  albumimage.tourpackageId,
  albumimage.albumtitle,
  albumimage.albumcoverimageurl
  FROM albumimage
  JOIN tourpackage ON albumimage.tourpackageId = tourpackage.PkID
  WHERE albumimage.tourpackageId = ?;  
`;
    const [results] = await pool.execute(albumimages, [PkID]);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getHighlights = async (PkID) => {
  try {
    const highlightsQuery = `
      SELECT
        highlights.id,
        highlights.tour_package_id,
        highlights.highlights
      FROM
        highlights
        JOIN tourpackage ON highlights.tour_package_id = tourpackage.PkID
      WHERE
        highlights.tour_package_id = ?
    `;
    const [results] = await pool.execute(highlightsQuery, [PkID]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getBookingPolicy = async (PkID) => {
  try {
    const bookingPolicyQuery = `
    SELECT
    booking_policy.id,
    booking_policy.tour_package_id,
    booking_policy.booking_policy
  FROM booking_policy
  JOIN tourpackage ON booking_policy.tour_package_id = tourpackage.PkID
  WHERE booking_policy.tour_package_id = ?;
`;
    const [results] = await pool.execute(bookingPolicyQuery, [PkID]);
    return results;
  } catch (error) {
    throw error;
  }
};



const getAllTourPackages = async () => {
  try {
    const tourPackageQuery = `
    SELECT
      tourpackage.PkID AS tour_package_id,
      tourpackage.MainTitle,
      tourpackage.TripType,
      tourpackage.Location,
      tourpackage.StartDate,
      tourpackage.EndDate,
      tourpackage.AvailableSeats,
      tourpackage.PricePerAdult,
      tourpackage.PricePerChild,
      tourpackage.PricePerInfant,
      tourpackage.GirlsTrip,
      tourpackage.PackageOverview,
      tourpackage.MinimumAge,
      tourpackage.MaximumAge,
      tourpackage.Price,
      tourpackage.City,
      tourpackage.Discount,
      tourpackage.SelfGuided,
      tourpackage.Flight,
      tourpackage.Food,
      tourpackage.Transport,
      tourpackage.FullyGuided,
      tourpackage.coverImage
    FROM
      tourpackage;
  `;

    const [tourPackageResults] = await pool.execute(tourPackageQuery);

    console.log(tourPackageResults);
    if (tourPackageResults.length === 0) {
      return []; // No tour packages found
    }

     const tourPackagesData=[]
    const tourPackageData = tourPackageResults.map(tourPackage => ({
      PkID: tourPackage.tour_package_id,
      MainTitle: tourPackage.MainTitle,
      TripType: tourPackage.TripType,
      Location: tourPackage.Location,
      StartDate: tourPackage.StartDate,
      EndDate: tourPackage.EndDate,
      AvailableSeats: tourPackage.AvailableSeats,
      MinimumAge: tourPackage.MinimumAge,
      MaximumAge: tourPackage.MaximumAge,
      PricePerAdult: tourPackage.PricePerAdult,
      PricePerChild: tourPackage.PricePerChild,
      PricePerInfant: tourPackage.PricePerInfant,
      Discount: tourPackage.Discount,
      PackageOverview: tourPackage.PackageOverview,
      coverImage: tourPackage.coverImage,
      // Add other fields as needed
    }));



    const [
      getmainimg,
      tourPlan,
      visitedPlaces,
      inclusions,
      exclusion,
      highlights,
      bookingPolicy,
      cancellationPolicy,
      albumImage,
      // addOns,
    ] = await Promise.all([
      getmainimage(tourPackageData.PkID),
      getTourPlan(tourPackageData.PkID),
      getVisitedPlace(tourPackageData.PkID),
      getInclusion(tourPackageData.PkID),
      getExclusion(tourPackageData.PkID),
      getHighlights(tourPackageData.PkID),
      getBookingPolicy(tourPackageData.PkID),
      getCancellationPolicy(tourPackageData.PkID),
      getalbumImage(tourPackageData.PkID),

      // getAddOns(tourPackageData.id),
    ]);

    tourPackageData.main_image = getmainimg;
    tourPackageData.tour_plan = tourPlan;
    tourPackageData.place_to_visit = visitedPlaces;
    tourPackageData.inclusion = inclusions;
    tourPackageData.exclusion = exclusion;
    tourPackageData.highlights = highlights;
    tourPackageData.booking_policy = bookingPolicy;
    tourPackageData.cancellation_policy = cancellationPolicy;
    tourPackageData.albumImage = albumImage;
    // tourPackageData.add_ons = addOns;
    tourPackagesData.push(tourPackageData);
    return tourPackageData;

   
  } catch (error) {
    throw error;
  }
};




export const tourpackageService = {
  getSingleTourPackages,
  addtourpackage

};