/*


import multer from "multer";
import { Storage } from "@google-cloud/storage";
import httpStatus from "http-status";
import pool from "../../database/db";


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

const updateTourPackage = async (req, res) => {
  try {
    const packgeId = req.params.PkID; // Assuming packageId is passed in the request parameters
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
    } = req.body;

    // Assuming the file field name is 'coverImage'
    // Extract cover image details from the uploaded file
    const coverImage = req.publicImageLink;

    // Check if cover image is present

    // Execute raw SQL UPDATE query to update tour package details in the database
    const values = [
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
      packgeId, // Add packageId for WHERE clause
    ];

    const [result] = await pool.query(
      `UPDATE tourpackage SET 
        MainTitle = ?, 
        SubTitle = ?, 
        Price = ?, 
        PricePerAdult = ?, 
        PricePerChild = ?, 
        PricePerInfant = ?, 
        City = ?, 
        Discount = ?, 
        Location = ?, 
        Availability = ?, 
        StartDate = ?, 
        EndDate = ?, 
        TripType = ?, 
        TotalDuration = ?, 
        AvailableSeats = ?, 
        MinimumAge = ?, 
        MaximumAge = ?, 
        PackageOverview = ?, 
        Showpackage = ?, 
        Flight = ?, 
        Transport = ?, 
        Food = ?, 
        Hotel = ?, 
        Country = ?, 
        GirlsTrip = ?, 
        FamilyTrips = ?, 
        Adventure = ?, 
        FullyGuided = ?, 
        SelfGuided = ?, 
        Guide = ?, 
        CancellationDate = ?, 
        coverImage = ? 
      WHERE PkId = ?`,
      values
    );
    return result;

 
  } catch (error) {
    console.error("Error updating travel package:", error);
    res.status(500).json({ error: "Error updating travel package" });
  }
};


const MainImage = async (req, PkID) => {
  let connection;
  try {
    console.log(PkID);
    const images = req.images;
    connection = await pool.getConnection();
    const packageQuery = "SELECT PkID  FROM tourpackage WHERE PkID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PkID]);
    console.log(packageResults);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const packageId = packageResults[0]?.PkID;
    console.log(packageId);

    // Insert each image URL into the cover_image table
    const insertQuery =
      "INSERT INTO  mainimage (imageId, imageurl, packageId) VALUES (?, ?, ?)";
    console.log(insertQuery);

    const insertResults = [];
    for (const imageurl of images) {
      const imageId = customcancId();
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
const values  = [imageUrl, Id];
const [result] = await pool.query(updateQuery, values);
return result;

};

const createPlaceVisit = async (req, PkID) => {
  let connection;
  try {
    const images = req.images;
    let placetovisit_names = req.body?.placetovisit_name;
    connection = await pool.getConnection();

    const packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PkID]);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }
    const tourPackageId = packageResults[0]?.PkID;

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

const createAlbumImage = async (req, PkID) => {
  let connection;
  try {
    const images = req.images;
    const { albumtitle } = req.body;
    connection = await pool.getConnection();
    const packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PkID]);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const tourPackageId = packageResults[0]?.PkID;
    const insertResults = [];
    const newalbumquery = `INSERT INTO albumimage (AlbumId, albumcoverimageurl, albumtitle , tourpackageId) values(?,?,?,?)`;
    for (let i = 0; i < images.length; i++) {
      const id = visitedimageid();
      const insertValues = [
        id,
        images[i],
        albumtitle,
        tourPackageId,
        // Use the specific name at index i, or an empty string if not available
      ];
      console.log(insertValues);

      const [result] = await connection.execute(newalbumquery, insertValues);
      insertResults.push({
        AlbumId: id,
        tourpackageId: tourPackageId,
        albumtitle: albumtitle || "", // Use the specific name at index i, or an empty string if not available
        albumcoverimageurl: images[i],
      });
    }
    connection.release(); // Release the connection back to the pool
    return insertResults;
  } catch (error) {
    console.log(error);
  }
};

const UpdateAlbumImage = async (req, AlbumId) => {
    const  {albumtitle} = req.body;
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
const values  = [imageUrl, albumtitle, Id];
const [result] = await pool.query(updateQuery, values);
return result;
 
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
    const updatedOrInsertedTourPlans = [];
    // Iterate over the array of tour plan data
    for (const tourPlanData of req.body.tourplanData) {
      const { day_title, day_plan, id } = tourPlanData; // Extract ID from tourPlanData
      // Retrieve tour package ID from the database
      const packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
      const [packageResults] = await connection.execute(packageQuery, [
        req.params.PkID,
      ]);
      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }
      const tourPackageId = packageResults[0]?.PkID;

      if (id) {
        // Check if ID is provided
        // Update the tour plan in the database
        await pool.query(
          `UPDATE tourplan SET day_title = ?, day_plan = ? WHERE id = ?`,
          [day_title, day_plan, id]
        );
        updatedOrInsertedTourPlans.push({
          id,
          status: "sucesss",
          message: "tourplan updated successfully",
        }); // Push info about the update
      } else {
        // Generate a unique ID for the tour plan
        const generatedId = generatePackageId();

        // Prepare values for the INSERT query
        const values = [generatedId, tourPackageId, day_title, day_plan];

        // Execute the INSERT query to add the tour plan to the database
        const [result] = await pool.query(
          `INSERT INTO tourplan (id, tour_package_id, day_title, day_plan) VALUES (?, ?, ?, ?)`,
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

const createInclusion = async (req, PkID) => {
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

      const packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
      const [packageResults] = await connection.execute(packageQuery, [PkID]);

      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }

      const tourPackageId = packageResults[0].PkID;

      if (id) {
        // If ID is provided, update the existing inclusion
        const updateQuery = "UPDATE inclusion SET inclusion = ? WHERE id = ?";
        await connection.execute(updateQuery, [inclusionText, id]);
        updatedOrInsertedInclusions.push({
          id,
          status: "success",
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


const createExclusion = async (req, PkID) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const updatedOrInsertedExclusions = [];
    const exclusions = req.body;

    if (!exclusions || !Array.isArray(exclusions) || exclusions.length === 0) {
      throw new Error("Exclusion data is required as an array of objects.");
    }

    const packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PkID]);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const tour_package_id = packageResults[0].PkID;

    for (const exclusionObj of exclusions) {
      const exclusionId = exclusionObj.id;
      const existingExclusionQuery = "SELECT id FROM exclusion WHERE id = ?";
      const [existingExclusionResults] = await connection.execute(existingExclusionQuery, [exclusionId]);

      if (existingExclusionResults.length > 0) {
        // If the exclusion ID exists, update the existing record
        await connection.execute(
          "UPDATE exclusion SET exclusion = ? WHERE id = ?",
          [exclusionObj.exclusion, exclusionId]
        );
        updatedOrInsertedExclusions.push({
          id: exclusionId,
          status: "success",
          message: "Exclusion updated successfully",
        });
      } else {
        // If the exclusion ID doesn't exist, insert a new record
        const pack_id = custominclusion();
        const insertQuery = "INSERT INTO exclusion (id, tour_package_id, exclusion) VALUES (?, ?, ?)";
        await connection.execute(insertQuery, [pack_id, tour_package_id, exclusionObj.exclusion]);
        updatedOrInsertedExclusions.push({
          id: pack_id,
          status: "success",
          message: "Exclusion inserted successfully",
        });
      }
    }

    return updatedOrInsertedExclusions;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


const createBookingPolicy = async (req, PkID) => {
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

      const packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
      const [packageResults] = await connection.execute(packageQuery, [PkID]);

      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }

      const tour_package_id = packageResults[0].PkID;

      if (id) {
        // If ID is provided, update the existing booking policy
        const updateQuery = "UPDATE booking_policy SET booking_policy = ? WHERE id = ?";
        await connection.execute(updateQuery, [booking_policy, id]);
        updatedOrInsertedPolicies.push({
          id,
          status: "success",
          message: "Booking policy updated successfully"
        });
      } else {
        // If ID is not provided, it's a new booking policy to be inserted
        const newId = customBookingPolicy();
        const insertQuery = "INSERT INTO booking_policy (id, tour_package_id, booking_policy) VALUES (?, ?, ?)";
        await connection.execute(insertQuery, [newId, tour_package_id, booking_policy]);
        updatedOrInsertedPolicies.push({
          id: newId,
          status: "success",
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

const createCancelationPolicy = async (req, PkID) => {
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
    const packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
    const [packageResults] = await connection.execute(packageQuery, [PkID]);

    if (packageResults.length === 0) {
      throw new Error("Tour package not found.");
    }

    const tour_package_id = packageResults[0].PkID;

    const insertQuery =
      "INSERT INTO cancellation_policy (id, tour_package_id, cancellation_policy) VALUES (?, ?, ?)";

    const insertResults = [];

    // Insert each cancellation policy object as a separate row
    for (const cancellationObj of cancellationPolicies) {
      const id = customcancId();
      const insertValues = [
        id,
        tour_package_id,
        cancellationObj.cancellation_policy,
      ];
      const [result] = await connection.execute(insertQuery, insertValues);
      insertResults.push(result);
    }
    connection.release();

    return insertResults;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const createHighlights = async (req, PkID) => {
  try {
    const highlights = req.body;

    if (!highlights || !Array.isArray(highlights) || highlights.length === 0) {
      throw new Error("Highlights are required as an array of objects.");
    }

    const connection = await pool.getConnection();
    const updatedOrInsertedHighlights = [];

    for (const highlightObj of highlights) {
      const { id, highlights } = highlightObj;

      if (!highlights) {
        throw new Error("Highlight text is required for each object.");
      }

      const packageQuery = "SELECT PkID FROM tourpackage WHERE PkID = ?";
      const [packageResults] = await connection.execute(packageQuery, [PkID]);

      if (packageResults.length === 0) {
        throw new Error("Tour package not found.");
      }

      const tour_package_id = packageResults[0].PkID;

      if (id) {
        // If ID is provided, update the existing highlight
        const updateQuery = "UPDATE highlights SET highlights = ? WHERE id = ?";
        await connection.execute(updateQuery, [highlights, id]);
        updatedOrInsertedHighlights.push({
          id,
          status: "success",
          message: "Highlight updated successfully"
        });
      } else {
        // If ID is not provided, it's a new highlight to be inserted
        const newId = customHighlight();
        const insertQuery = "INSERT INTO highlights (id, tour_package_id, highlights) VALUES (?, ?, ?)";
        await connection.execute(insertQuery, [newId, tour_package_id, highlights]);
        updatedOrInsertedHighlights.push({
          id: newId,
          status: "success",
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

const createAddOns = async (tour_package_id, req) => {
  try {
    const addOns = req.body;

    if (!addOns || !Array.isArray(addOns) || addOns.length === 0) {
      throw new Error("Add-ons are required as an array of objects.");
    }

    const connection = await pool.getConnection();
    const updatedOrInsertedAddOns = [];

    for (const addOn of addOns) {
      const { id, service, description, title } = addOn;

      if (!service || !description || !title) {
        throw new Error("Service, description, and title are required for each add-on object.");
      }

      const insertQuery =
        "INSERT INTO add_ons (id, services, description, tour_package_id, title) VALUES (?, ?, ?, ?, ?)";

      if (id) {
        // If ID is provided, update the existing add-on
        const updateQuery = "UPDATE add_ons SET services = ?, description = ?, title = ? WHERE id = ?";
        await connection.execute(updateQuery, [service, description, title, id]);
        updatedOrInsertedAddOns.push({
          id,
          status: "success",
          message: "Add-on updated successfully"
        });
      } else {
        // If ID is not provided, it's a new add-on to be inserted
        const newId = Addonservice(); // Assuming Addonservice generates a new ID
        const [result] = await connection.execute(insertQuery, [newId, service, description, tour_package_id, title]);
        updatedOrInsertedAddOns.push({
          id: newId,
          status: "success",
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

    const [tourPackageResults] = await pool.query(tourPackageQuery, [PkID]);

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
    return tourPackageResults;
  } catch (error) {
    throw error;
  }
};


export const tourpackageService = {
  getAllTourPackages,
  addtourpackage,
  MainImage,
  createPlaceVisit,
  createTourPlan,
  getTourPlan,
  deleteTourPlanEvents,
  createInclusion,
  createExclusion,
  createBookingPolicy,
  createCancelationPolicy,
  createHighlights,
  createAddOns,
  getSingleTourPackages,
  getBookingPolicy,
  createAlbumImage,
  UpdateAlbumImage,
  updateTourPackage,
  UpdateMainImage
};
*/
