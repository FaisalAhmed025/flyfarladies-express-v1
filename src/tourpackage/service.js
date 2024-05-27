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

const cancelationpolicy = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "c" + Math.floor(Math.random() * 10000);
};

const customHighlight = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "H" + Math.floor(Math.random() * 10000);
};


function logMessage() {
  console.log('Cron job executed at:', new Date().toLocaleString());
 }

 const deactivatePackages = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
    console.log(currentDate);

    // Step 1: Get all tourpackage records that are currently active
    const activePackagesQuery = `
      SELECT PKID
      FROM tourpackage
      WHERE isActive = 1
    `;
    const [activePackages] = await connection.execute(activePackagesQuery);

    // Step 2: Check each active package for future bookingslots
    for (const packagedata of activePackages) {
      const { PKID } = packagedata;

      const bookingslotQuery = `
        SELECT COUNT(*) as count
        FROM bookingslot
        WHERE packageId = ? AND StartDate >= ?
      `;

      const [results] = await connection.execute(bookingslotQuery, [PKID, currentDate]);
      const { count } = results[0];

      // Step 3: If no future bookingslots found, deactivate the package
      if (count === 0) {
        const updateQuery = `
          UPDATE tourpackage
          SET isActive = 0
          WHERE PKID = ?
        `; 
        await connection.execute(updateQuery, [PKID]);
      }
    }

    console.log('Packages deactivated successfully');
  } catch (error) {
    console.error('Error deactivating packages:', error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


cron.schedule('0 0 * * *', async () => {
  console.log('Running package deactivation task...');
  logMessage()
  await deactivatePackages();
});


const addtourpackage = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    // Start transaction
    await connection.beginTransaction();

    // Extract tour package details from request body
    const {
      MainTitle,
      Price,
      City,
      Discount,
      Location,
      Availability,
      TripType,
      TotalDuration,
      PackageOverview,
      Showpackage,
      Flight,
      Transport,
      Food,
      Hotel,
      Country,
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
      accommodation,
      child // Extract child array from request body
    } = req.body;

    console.log(req.body)

    // Assuming the file field name is 'coverImage'
    // Extract cover image details from the uploaded file
    const coverImage = req.publicImageLink;
    const packageId = generatePackageId();

    // Check if cover image is present
    if (!coverImage) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    // Insert tour package details into database
    const tourPackageValues = [
      packageId,
      MainTitle,
      Price,
      City,
      Discount,
      Location,
      Availability,
      TripType,
      TotalDuration,
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

    const insertPackageQuery = `
      INSERT INTO tourpackage (PKID, MainTitle, Price, City, Discount, Location, Availability, TripType, TotalDuration, MinimumAge, MaximumAge, PackageOverview, Showpackage, Flight, Transport, Food, Hotel, Country, GirlsTrip, FamilyTrips, Adventure, FullyGuided, SelfGuided, Guide, CancellationDate, coverImage, adult_base_price, child_base_price, infant_base_price, accommodation)
      VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await connection.query(insertPackageQuery, tourPackageValues);

    // Insert child details into database

    if (child) {
      const childArray = JSON.parse(child);
      if (Array.isArray(childArray) && childArray.length > 0) {
        const childInsertValues = childArray.map(({ agelimit, price, inclusion, exclusion }) => [
          packageId,  // Reference to the tour package ID
          agelimit,
          price,
          inclusion,
          exclusion
        ]);
        console.log(childInsertValues)
        const insertChildQuery = `
          INSERT INTO childfare (packageId, agelimit, price, inclusion, exclusion)
          VALUES ?
        `;
        await connection.query(insertChildQuery, [childInsertValues]);
      }
    }

    // Commit transaction
    await connection.commit();

    return res.status(200).json({
      status: "success",
      message: "Travel package added successfully",
      packageId
    });
  } catch (error) {
    // Rollback transaction in case of error
    await connection.rollback();
    console.error("Error adding travel package:", error);
    res.status(500).json({ error: "Error adding travel package" });
  } finally {
    // Release connection back to the pool
    connection.release();
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
      // child_base_price: tourPackageResults[0].child_base_price,
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
      childfare:[],
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
      add_ons:[],
      bookingslot:[]
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
      add_ons,
      bookingslot,
      childfaredata

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
      getBookingslot(tourPackageData.PKID),
      getchildfare(tourPackageData.PKID)
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
    tourPackageData.bookingslot =bookingslot
    tourPackageData.childfare =childfaredata;
    tourPackagesData.push(tourPackageData);
    return tourPackageData;
  } catch (error) {
    throw error;
  }
};


const getinstallment = async (PKID) => {
  try {
    console.log("id", PKID);
    const installmentQuery = `
      SELECT
        i.InstallmentId,
        i.bookingslotid,
        i.tourpackageId,
        i.FirstInstallmentdueDate,
        i.SecondInstallmentdueDate,
        i.ThirdInstallmentdueDate,
        i.ABookingAmount,
        i.AFirstInstallmentAmount,
        i.ASecondInstallmentAmount,
        i.IBookingAmount,
        i.IFirstInstallmentAmount,
        i.ISecondInstallmentAmount,
        ci.childid,
        ci.CBookingAmount AS ChildBookingAmount,
        ci.CFirstInstallmentAmount AS ChildFirstInstallmentAmount,
        ci.CSecondInstallmentAmount AS ChildSecondInstallmentAmount
      FROM installment i
      LEFT JOIN childinstalment ci ON i.InstallmentId = ci.InstallmentId
      WHERE i.tourpackageId = ? ORDER BY childid ASC;
    `;
    const [results] = await pool.execute(installmentQuery, [PKID]);

    const installmentMap = {};

    // Group the results by InstallmentId to structure the output correctly
    results.forEach(row => {
      if (!installmentMap[row.InstallmentId]) {
        installmentMap[row.InstallmentId] = {
          InstallmentId: row.InstallmentId,
          bookingslotid: row.bookingslotid,
          tourpackageId: row.tourpackageId,
          FirstInstallmentdueDate: row.FirstInstallmentdueDate,
          SecondInstallmentdueDate: row.SecondInstallmentdueDate,
          ThirdInstallmentdueDate: row.ThirdInstallmentdueDate,
          ABookingAmount: row.ABookingAmount,
          AFirstInstallmentAmount: row.AFirstInstallmentAmount,
          ASecondInstallmentAmount: row.ASecondInstallmentAmount,
          IBookingAmount: row.IBookingAmount,
          IFirstInstallmentAmount: row.IFirstInstallmentAmount,
          ISecondInstallmentAmount: row.ISecondInstallmentAmount,
          childinstallments: []
        };
      }
      if (row.childid) {
        installmentMap[row.InstallmentId].childinstallments.push({
          childid: row.childid,
          bookingslotid: row.bookingslotid,
          CBookingAmount: row.ChildBookingAmount,
          CFirstInstallmentAmount: row.ChildFirstInstallmentAmount,
          CSecondInstallmentAmount: row.ChildSecondInstallmentAmount
        });
      }
    });

    // Convert the map to an array
    const structuredResults = Object.values(installmentMap);
    return structuredResults;
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

const getbookingslot = async (req, res) => {
  const id = req.params.id
  const tourplanquery = `SELECT * FROM bookingslot WHERE id= ?`
  const [data] = await pool.query(tourplanquery, [id])
  return res.status(200).json({
    status: true,
    data: data
  })
}

const updateChildfare = async(req,res)=>{
  const childfareid = req.params.childfareid
  const { agelimit, price, inclusion, exclusion} =req.body

  try {
    // SQL query to update the childfare details
    const updateQuery = `
      UPDATE childfare
      SET 
        agelimit = ?,
        price = ?,
        inclusion = ?,
        exclusion = ?
      WHERE 
        childfareid = ?`;

    // Execute the query with the provided details
    const [result] = await pool.query(updateQuery, [agelimit, price, inclusion, exclusion, childfareid]);

    // Check if any row was updated
    if (result.affectedRows === 0) {
      throw new Error('No record found with the provided childfareid');
    }
    return res.status(200).json({
      status: true,
      message:'updated successfully',
      data: result
    })
  } catch (error) {
    throw error;
  } finally {
    console.log("realese data")
  }
}


const getchildfare = async (PKID) => {
  try {
    // Retrieve tour plan details with order by uId in ascending order
    const childfare = `
    SELECT
    childfare.childfareid,
    childfare.packageId,
    childfare.agelimit,
    childfare.price,
    childfare.inclusion,
    childfare.exclusion
  FROM childfare
  JOIN tourpackage ON childfare.packageId = tourpackage.PKID
  WHERE childfare.packageId COLLATE utf8mb4_general_ci = ? 
  ORDER BY 
  childfare.childfareid ASC`;
    const [childfaredata] = await pool.query(childfare, [PKID]);
    return childfaredata;
  } catch (error) {
    throw error;
  } finally {
    // Release the database connection
  }
};

const getInstallment = async (id,pkid) => {
  try{
  const tourplanquery = `SELECT * FROM installment WHERE tourpackageId=? AND  bookingslotid= ?`
  const [data] = await pool.query(tourplanquery, [pkid,id])
  console.log(data)
  return data
}
catch(error){
  throw new Error(error)
}
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
  WHERE tour_itinerary.tour_package_id = ?
  ORDER BY 
  tour_itinerary.id ASC;    
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
  WHERE inclusion.tour_package_id = ? 
  ORDER BY
  inclusion.id ASC;  
`;
    const [results] = await pool.execute(inclusionQuery, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getBookingslot = async (PKID) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const inclusionQuery = `
        SELECT
        bookingslot.id,
        bookingslot.tour_package_id,
        bookingslot.StartDate,
        bookingslot.EndDate,
        bookingslot.available_seat,
        bookingslot.cancellationDate,
        bookingslot.soldOut
      FROM bookingslot
      JOIN tourpackage ON bookingslot.tour_package_id = tourpackage.PKID
      WHERE bookingslot.tour_package_id = ? AND bookingslot.StartDate > ?
      ORDER BY bookingslot.id ASC
    `;

    console.log(currentDate)
    const [results] = await pool.execute(inclusionQuery, [PKID, currentDate]);
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
  WHERE exclusion.tour_package_id = ?
  ORDER BY exclusion.id;  
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
  WHERE cancellation_policy.tour_package_id = ?
  ORDER BY 
  cancellation_policy.id ASC;
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
        ORDER BY
        highlights.id ASC
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
  WHERE booking_policy.tour_package_id = ?
  ORDER BY
  booking_policy.id ASC;  
`;
    const [results] = await pool.execute(bookingPolicyQuery, [PKID]);
    return results;
  } catch (error) {
    throw error;
  }
};


const Allpackages = async (res) => {
  try {
    const tourPackageQuery = `
      SELECT *
        FROM tourpackage
    `;
    const [allpckages] = await pool.execute(tourPackageQuery);
    // Parse JSON strings to objects for booking_slots
    return res.send({ tourPackageResults: allpckages})
  } catch (error) {
    throw error;
  }
};


const getAllTourPackages = async () => {
  try {
    const tourPackageQuery = `
      SELECT
        tourpackage.PKID,
        tourpackage.MainTitle,
        tourpackage.SubTitle,
        tourpackage.TripType,
        tourpackage.Location,
        tourpackage.StartDate,
        tourpackage.EndDate,
        tourpackage.AvailableSeats,
        tourpackage.MinimumAge,
        tourpackage.MaximumAge,
        tourpackage.TotalDuration,
        tourpackage.adult_base_price,
        tourpackage.child_base_price,
        tourpackage.infant_base_price,
        tourpackage.Discount,
        tourpackage.PackageOverview,
        tourpackage.Showpackage,
        tourpackage.Flight,
        tourpackage.Transport,
        tourpackage.Food,
        tourpackage.Hotel,
        tourpackage.Country,
        tourpackage.GirlsTrip,
        tourpackage.FamilyTrips,
        tourpackage.Adventure,
        tourpackage.FullyGuided,
        tourpackage.SelfGuided,
        tourpackage.Guide,
        tourpackage.CancellationDate,
        tourpackage.coverImage,
        tourpackage.booking_money_due_date,
        tourpackage.first_installment_due_date,
        tourpackage.second_installment_due_date,
        tourpackage.booking_money,
        tourpackage.first_installment,
        tourpackage.second_installment,
        tourpackage.Nature,
        tourpackage.couponCode,
        tourpackage.vipCoupon,
        tourpackage.universalCoupon,
        tourpackage.internationalCoupon,
        tourpackage.domesticCoupon,
        tourpackage.bucketCoupon,
        tourpackage.tourType,
        tourpackage.metatag,
        tourpackage.metaDescription,
        tourpackage.accommodation,
        GROUP_CONCAT(
          JSON_OBJECT(
            'id', bookingslot.id,
            'StartDate', bookingslot.StartDate,
            'EndDate', bookingslot.EndDate,
            'available_seat', bookingslot.available_seat
          )
        ) AS booking_slots
      FROM
        tourpackage
      LEFT JOIN
        bookingslot ON tourpackage.PKID = bookingslot.tour_package_id
      WHERE
        tourpackage.isActive=1
      GROUP BY
        tourpackage.PKID,
        tourpackage.MainTitle,
        tourpackage.SubTitle,
        tourpackage.TripType,
        tourpackage.Location,
        tourpackage.StartDate,
        tourpackage.EndDate,
        tourpackage.AvailableSeats,
        tourpackage.MinimumAge,
        tourpackage.MaximumAge,
        tourpackage.TotalDuration,
        tourpackage.adult_base_price,
        tourpackage.child_base_price,
        tourpackage.infant_base_price,
        tourpackage.Discount,
        tourpackage.PackageOverview,
        tourpackage.Showpackage,
        tourpackage.Flight,
        tourpackage.Transport,
        tourpackage.Food,
        tourpackage.Hotel,
        tourpackage.Country,
        tourpackage.GirlsTrip,
        tourpackage.FamilyTrips,
        tourpackage.Adventure,
        tourpackage.FullyGuided,
        tourpackage.SelfGuided,
        tourpackage.Guide,
        tourpackage.CancellationDate,
        tourpackage.coverImage,
        tourpackage.booking_money_due_date,
        tourpackage.first_installment_due_date,
        tourpackage.second_installment_due_date,
        tourpackage.booking_money,
        tourpackage.first_installment,
        tourpackage.second_installment,
        tourpackage.Nature,
        tourpackage.couponCode,
        tourpackage.vipCoupon,
        tourpackage.universalCoupon,
        tourpackage.internationalCoupon,
        tourpackage.domesticCoupon,
        tourpackage.bucketCoupon,
        tourpackage.tourType,
        tourpackage.metatag,
        tourpackage.metaDescription,
        tourpackage.accommodation;
    `;
    const [tourPackageResults] = await pool.execute(tourPackageQuery);
    // Parse JSON strings to objects for booking_slots
    const formattedResults = tourPackageResults.map((result) => {
      result.booking_slots = result.booking_slots ? JSON.parse(`[${result.booking_slots}]`) : [];
      return result;
    });

    console.log(formattedResults);
    return formattedResults;
  } catch (error) {
    throw error;
  }
};



// const getAllTourPackages = async () => {
//   try {
//     const tourPackageQuery = `
//     SELECT*
//     FROM
//       tourpackage WHERE isActive=1;
//   `;
//     const [tourPackageResults] = await pool.execute(tourPackageQuery);
//     console.log(tourPackageResults);
//     return tourPackageResults;

//   } catch (error) {
//     throw error;
//   }
// };

const updateTourPackage = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const packageId = req.params.PKID; // Assuming packageId is passed in the request parameters

    const packageQuery = `SELECT * FROM tourpackage WHERE PKID = ?`;
    const [tourpackage] = await connection.query(packageQuery, [packageId]);

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
      accommodation,
      child // Assuming child fares are coming from request body
    } = req.body;

    const coverimage = req.publicImageLink;

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

    const [result] = await connection.query(
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

    if (child) {
      const childArray = JSON.parse(child);
      if (Array.isArray(childArray) && childArray.length > 0) {
        for (const fare of childArray) {
          const { childfareid, agelimit, price, inclusion, exclusion } = fare;

          console.log(childArray);

          // Check if the child fare exists
          const childFareQuery = `SELECT childfareid FROM childfare WHERE childfareid = ? AND packageId = ?`;
          const [childFareResult] = await connection.query(childFareQuery, [childfareid, packageId]);

          if (childFareResult.length > 0) {
            // Update existing child fare
            const updateChildFareQuery = `
              UPDATE childfare
              SET agelimit = ?, price = ?, inclusion = ?, exclusion = ?
              WHERE childfareid = ? AND packageId = ?
            `;
            await connection.query(updateChildFareQuery, [agelimit, price, inclusion, exclusion, childfareid, packageId]);
          }
        }
      }
    }

    console.log(child)

    return res.status(200).json({ status: 'success', message: 'Tour package updated successfully', Id: packageId });
  } catch (error) {
    console.error("Error updating travel package:", error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
    }
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


const deleteBOOKINGSLOT = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM bookingslot WHERE  id= ?`
  await pool.query(deletequery, [id])
  const deleteinstallmentQuery =`DELETE FROM bookingslot WHERE bookingslotid= ?`
  await pool.query(deleteinstallmentQuery, [id])

  return res.status(200).json({
    status: true,
    message: 'slot has removed'
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

// const addInstallment = async (req, PKID) => {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     const updatedOrInsertedInstallments = [];
//     const installment = req.body;
//     const packageQuery = `SELECT PKID FROM tourpackage WHERE PKID = ?`;
//     const [packageResults] = await connection.execute(packageQuery, [PKID]);
//     if (packageResults.length === 0) {
//       throw new Error("Tour package not found.");
//     }

//     const tour_package_id = packageResults[0].PKID;
//     console.log(tour_package_id)

//     const {
//       InstallmentId,
//       bookingslotid,
//       FirstInstallmentdueDate,
//       SecondInstallmentdueDate,
//       ThirdInstallmentdueDate,
//       ABookingAmount,
//       AFirstInstallmentAmount,
//       ASecondInstallmentAmount,
//       CBookingAmount,
//       CFirstInstallmentAmount,
//       CSecondInstallmentAmount,
//       IBookingAmount,
//       IFirstInstallmentAmount,
//       ISecondInstallmentAmount
//     } = installment;

//     if (InstallmentId) {
//       const updateQuery = `UPDATE installment SET 
//                             FirstInstallmentdueDate = ?,
//                             SecondInstallmentdueDate = ?,
//                             ThirdInstallmentdueDate = ?,
//                             ABookingAmount = ?,
//                             AFirstInstallmentAmount = ?,
//                             ASecondInstallmentAmount = ?,
//                             CBookingAmount = ?,
//                             CFirstInstallmentAmount = ?,
//                             CSecondInstallmentAmount = ?,
//                             IBookingAmount = ?,
//                             IFirstInstallmentAmount = ?,
//                             ISecondInstallmentAmount = ?,
//                             bookingslotid = ?
//                             WHERE InstallmentId = ?`;

//       await connection.execute(updateQuery, [
//         FirstInstallmentdueDate,
//         SecondInstallmentdueDate,
//         ThirdInstallmentdueDate,
//         ABookingAmount,
//         AFirstInstallmentAmount,
//         ASecondInstallmentAmount,
//         CBookingAmount,
//         CFirstInstallmentAmount,
//         CSecondInstallmentAmount,
//         IBookingAmount,
//         IFirstInstallmentAmount,
//         ISecondInstallmentAmount,
//         bookingslotid,
//         InstallmentId
//       ]);

//       updatedOrInsertedInstallments.push({
//         InstallmentId,
//         status: true,
//         message: "Installment updated successfully"
//       });
//     } else {
//       // Define your function to generate a unique ID for installment
//       const insertQuery = `INSERT INTO installment (FirstInstallmentdueDate, SecondInstallmentdueDate, 
//                           ThirdInstallmentdueDate, ABookingAmount, AFirstInstallmentAmount, ASecondInstallmentAmount,
//                           CBookingAmount, CFirstInstallmentAmount, CSecondInstallmentAmount, IBookingAmount,
//                           IFirstInstallmentAmount, ISecondInstallmentAmount, tourpackageId, bookingslotid) 
//                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//       await connection.execute(insertQuery, [
//         FirstInstallmentdueDate || null,
//         SecondInstallmentdueDate || null,
//         ThirdInstallmentdueDate ||null,
//         ABookingAmount || null,
//         AFirstInstallmentAmount || null,
//         ASecondInstallmentAmount || null,
//         CBookingAmount || null,
//         CFirstInstallmentAmount || null,
//         CSecondInstallmentAmount || null,
//         IBookingAmount || null,
//         IFirstInstallmentAmount || null,
//         ISecondInstallmentAmount || null,
//         tour_package_id,
//         bookingslotid
//       ]);

//       updatedOrInsertedInstallments.push({
//         status: true,
//         message: "New installment inserted successfully"
//       });
//     }

//     return updatedOrInsertedInstallments;
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.message);
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// };


const addInstallment = async (req, PKID) => {
  let connection;
  try {
    // Get a database connection
    connection = await pool.getConnection();
    // Extract installment details from request body
    const {
      InstallmentId,
      bookingslotid,
      FirstInstallmentdueDate,
      SecondInstallmentdueDate,
      ThirdInstallmentdueDate,
      ABookingAmount,
      AFirstInstallmentAmount,
      ASecondInstallmentAmount,
      childinstalment,
      IBookingAmount,
      IFirstInstallmentAmount,
      ISecondInstallmentAmount
    } = req.body;

    // Verify if the tour package exists
    const packageQuery = `SELECT PKID FROM tourpackage WHERE PKID = ?`;
    const [packageResults] = await connection.execute(packageQuery, [PKID]);
    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const tour_package_id = packageResults[0].PKID;

    const updatedOrInsertedInstallments = [];

    // Check if we need to update an existing installment
    if (InstallmentId) {
      const updateQuery = `
        UPDATE installment 
        SET 
          FirstInstallmentdueDate = ?,
          SecondInstallmentdueDate = ?,
          ThirdInstallmentdueDate = ?,
          ABookingAmount = ?,
          AFirstInstallmentAmount = ?,
          ASecondInstallmentAmount = ?,
          IBookingAmount = ?,
          IFirstInstallmentAmount = ?,
          ISecondInstallmentAmount = ?,
          bookingslotid = ?
        WHERE InstallmentId = ?
      `;

      await connection.execute(updateQuery, [
        FirstInstallmentdueDate,
        SecondInstallmentdueDate,
        ThirdInstallmentdueDate,
        ABookingAmount,
        AFirstInstallmentAmount,
        ASecondInstallmentAmount,
        IBookingAmount,
        IFirstInstallmentAmount,
        ISecondInstallmentAmount,
        bookingslotid,
        InstallmentId
      ]);

      updatedOrInsertedInstallments.push({
        InstallmentId,
        status: true,
        message: "Installment updated successfully"
      });
    } else {
      // Insert a new installment record
      const insertQuery = `
        INSERT INTO installment (
          FirstInstallmentdueDate, SecondInstallmentdueDate, ThirdInstallmentdueDate,
          ABookingAmount, AFirstInstallmentAmount, ASecondInstallmentAmount,
          IBookingAmount, IFirstInstallmentAmount, ISecondInstallmentAmount,
          tourpackageId, bookingslotid
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

   const [data] =   await connection.execute(insertQuery, [
        FirstInstallmentdueDate || null,
        SecondInstallmentdueDate || null,
        ThirdInstallmentdueDate || null,
        ABookingAmount || null,
        AFirstInstallmentAmount || null,
        ASecondInstallmentAmount || null,
        IBookingAmount || null,
        IFirstInstallmentAmount || null,
        ISecondInstallmentAmount || null,
        tour_package_id,
        bookingslotid
      ]);

      console.log(data)
      const installemntid = data.insertId

      if (childinstalment) {
        if (Array.isArray(childinstalment) && childinstalment.length > 0) {
          for (const child of childinstalment) {
            const { childfareid, bookingslotid, CBookingAmount, CFirstInstallmentAmount, CSecondInstallmentAmount } = child;

            const value =[  tour_package_id,
              childfareid,
              bookingslotid,
              installemntid,
              CBookingAmount || null,
              CFirstInstallmentAmount || null,
              CSecondInstallmentAmount || null]
            const childInsertQuery = `
              INSERT INTO childinstalment (
                tour_package_id, childid, bookingslotid, installmentid, CBookingAmount,
                CFirstInstallmentAmount, CSecondInstallmentAmount
              ) 
              VALUES (?, ?, ?, ?, ?,?, ?)
            `;

            console.log(value)
    
            await connection.execute(childInsertQuery, value);
          }
        }
        }

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
   const updatedOrInsertedTourPlans =[]
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
        const values = [tourPackageId, day_title, day_plan, stayingPlace, breakFast, meal, dinner];

        // Execute the INSERT query to add the tour plan to the database
        const [result] = await pool.query(
          `INSERT INTO tour_itinerary (tour_package_id, day_title, day_plan, staying_place, breakFast, meal, dinner) VALUES (?, ?, ?,?,?,?,?)`,
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
        const insertQuery = "INSERT INTO inclusion ( tour_package_id, inclusion) VALUES ( ?, ?)";
        await connection.execute(insertQuery, [ tourPackageId, inclusionText]);
        updatedOrInsertedInclusions.push({
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


const createBookingSlot = async (req, res, PKID) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const bookingSlotData = req.body.bookingSlotData;

    const packageQuery = "SELECT PKID FROM tourpackage WHERE PKID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PKID]);

    if (packageResults.length === 0) {
      return res.send({message:"Tour package not found."});
    }
    const tourPackageId = packageResults[0].PKID;
    for (const slotData of bookingSlotData) {
      const { StartDate, EndDate, available_seat, cancellationDate, soldOut, id } = slotData;
      if (id) {
        // If ID is provided, update the booking slot in the database
        await connection.query(
          `UPDATE bookingslot SET StartDate = ?, EndDate = ?, cancellationDate=?, available_seat=?, soldOut=? WHERE id = ? AND tour_package_id = ?`,
          [StartDate, EndDate, cancellationDate, available_seat, soldOut, id, tourPackageId]
        );
      } else {
        // Generate a unique ID for the booking slot
        // Insert new booking slot into the database
        await connection.query(
          `INSERT INTO bookingslot (tour_package_id, StartDate, EndDate, cancellationDate, available_seat, soldOut) VALUES (?,?, ?,?,?,?)`,
          [ tourPackageId, StartDate, EndDate, cancellationDate,available_seat, soldOut]
        );
      }
    }

    console.log('Booking slots added/updated successfully');
  } catch (error) {
    console.error('Error creating/updating booking slots:', error);
    throw new Error('An error occurred while creating/updating booking slots');
  } finally {
    if (connection) {
      connection.release();
    }
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
  
        const insertQuery = "INSERT INTO exclusion ( tour_package_id, exclusion) VALUES (?, ?)";
        await connection.execute(insertQuery, [tourPackageId, exclusionText]);
        updatedOrInsertedExclusions.push({
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
    
        const insertQuery = "INSERT INTO booking_policy ( tour_package_id, booking_policy) VALUES (?, ?)";
        await connection.execute(insertQuery, [ tour_package_id, booking_policy]);
        updatedOrInsertedPolicies.push({
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
  let connection;
  try {
    const cancellationPolicies = req.body;
    if (!cancellationPolicies || !Array.isArray(cancellationPolicies) || cancellationPolicies.length === 0) {
      throw new Error("Cancellation policies are required as an array of objects.");
    }

    connection = await pool.getConnection();
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
        const [updateResult] = await connection.execute(updateQuery, [cancellation_policy, id, tour_package_id]);
        if (updateResult.affectedRows === 0) {
          throw new Error(`No cancellation policy found with id ${id} for this tour package.`);
        }
        insertResults.push({
          id,
          status: true,
          message: "Cancellation policy updated successfully"
        });
      } else {
        // If ID is not provided, it's a new cancellation policy to be inserted
        const insertQuery = `INSERT INTO cancellation_policy (tour_package_id, cancellation_policy) VALUES (?, ?)`;
         await connection.execute(insertQuery, [tour_package_id, cancellation_policy]);
        insertResults.push({
          status: true,
          message: "New cancellation policy inserted successfully"
        });
      }
    }
    await connection.commit();
    return insertResults;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error(error);
    throw new Error(error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


const cancellationPolicy = async (req, res) => {
  const id = req.params.id
  const deletequery = `DELETE FROM cancellation_policy WHERE id= ?`
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
        const insertQuery = "INSERT INTO highlights ( tour_package_id, highlights) VALUES (?, ?)";
        await connection.execute(insertQuery, [tour_package_id, highlights]);
        updatedOrInsertedHighlights.push({

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
  getbookingslot,
  Allpackages,
  getInstallment,
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
  deleteBOOKINGSLOT,
  updateChildfare,
  updatealbumIinnermage,
  UpdatevisitedImage,
  createBookingSlot
};