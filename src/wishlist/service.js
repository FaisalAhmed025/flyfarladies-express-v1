import { HttpException } from "express-sharp";
import pool from "../database/db"
import httpStatus from "http-status";



const generatewishId = () => {
  // This is just a simple example; you may want to use a more robust method in a production environment
  return "wishid" + Math.floor(Math.random() * 10000);
};


const addwishlist = async (req,res) =>{
 try {
  const packageid  = req.body.PkID
  const userid = req.body.id
  const packagequery = `SELECT * FROM tourpackage WHERE PkID=?`
  const [tourpackage] = await pool.query(packagequery, [packageid])
  const  userquery =  `SELECT * FROM user WHERE id =?`
  const [user] = await pool.query(userquery, [userid])
  if (user.length === 0) {
    throw new Error('User ID not found');
  }

  if (tourpackage.length === 0) {
    throw new Error('Package ID not found');
  }

  const wishCheckQuery = `SELECT * FROM wishlist WHERE packageid = ? AND userid = ?`;
  const [existingWishlist] = await pool.query(wishCheckQuery, [packageid, userid]);
  
  if (existingWishlist.length > 0) {
    throw new Error('Wishlist already exists for this user and package ID');
  }
  

  const wishid = generatewishId()

  const values  = [
    wishid,
    tourpackage[0].MainTitle,
    tourpackage[0].City,
    tourpackage[0].Discount,
    tourpackage[0].StartDate,
    tourpackage[0].EndDate,
    tourpackage[0].TripType,
    tourpackage[0].Country,
    tourpackage[0].AvailableSeats,
    tourpackage[0].MinimumAge,
    tourpackage[0].MaximumAge,
    tourpackage[0].TotalDuration,
    tourpackage[0].PackageOverview,
    tourpackage[0].Availability,
    tourpackage[0].Showpackage,
    tourpackage[0].PricePerAdult,
    tourpackage[0].PricePerChild,
    tourpackage[0].PricePerInfant,
    tourpackage[0].CancellationDate,
    tourpackage[0].Nature,
    tourpackage[0].Adventure,
    tourpackage[0].GirlsTrip,
    tourpackage[0].FamilyTrips,
    tourpackage[0].Flight,
    tourpackage[0].Food,
    tourpackage[0].Transport,
    tourpackage[0].Hotel,
    tourpackage[0].FullyGuided,
    tourpackage[0].SelfGuided,
    tourpackage[0].Guide,
    tourpackage[0].coverimageurl,
    tourpackage[0].Location,
    tourpackage[0].SubTitle,
    tourpackage[0].Price,
    userid,
    packageid

  ]

  console.log(values)
  
  const insertquery =`INSERT INTO wishlist (wishid, MainTitle, City, Discount, StartDate, EndDate, TripType, Country, AvailableSeats, MinimumAge, MaximumAge, TotalDuration, PackageOverview, Availability, Showpackage, PricePerAdult, PricePerChild, PricePerInfant, CancellationDate, Nature, Adventure, GirlsTrip, FamilyTrips, Flight, Food, Transport, Hotel, FullyGuided, SelfGuided, Guide, coverimageurl, Location, SubTitle, Price, userid, packageid)
  VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  const  [wishlistdata]  = await pool.query(insertquery, values)
  return res.status(200).json({
    status:true,
    message:'wishlist added successfully',
    data:wishlistdata
  }) 
  
 } catch (error) {
  console.log(error)
 }

}

const userwishlist = async (req,res) =>{
  const userid = req.params.id;
  const findUserQuery = 'SELECT * FROM user WHERE id = ?';
  const [user] = await pool.query(findUserQuery, [userid])
    // Query to find all wishlist items for the user
    const findWishlistQuery = 'SELECT * FROM wishlist WHERE userid = ?';

  const [datass]= await pool.query(findWishlistQuery, [userid])
  return res.json({ status:true,data:datass})
}

const removeWishlist = async (req,res)=>{
    const wishid = req.params.wishid;
    const deleteWishlistQuery = 'DELETE FROM wishlist WHERE wishid = ?';
    await pool.query(deleteWishlistQuery, [wishid])
    return res.json({ status:true, message:'wishlist has removed'})

}

export const wishlistService = {
  addwishlist,
  userwishlist,
  removeWishlist

}