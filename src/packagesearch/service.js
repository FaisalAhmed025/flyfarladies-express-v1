
import pool from "../database/db"

const getTourPackageByLocation = async(req,res) => {
  try {
    // Execute raw SQL query to fetch tour packages
    const tourPackages = await db.query('SELECT * FROM tourpackage');

    const matchingPackages = [];

    // Loop through fetched tour packages
    for (const tourPackage of tourPackages) {
      // Execute raw SQL query to fetch locations for each tour package
      const locations = await db.query('SELECT * FROM locations WHERE tourpackageId = ?', [tourPackage.id]);
      
      // Loop through fetched locations
      for (const location of locations) {
        // Check if the location matches the provided country or city
        if (location.country === country || location.city.includes(city)) {
          matchingPackages.push(tourPackage);
          break; // Once a matching location is found, break out of the inner loop
        }
      }
    }

    return { tourPackages: matchingPackages };
  } catch (error) {
    console.error('Error fetching tour packages by location:', error);
    throw error;
  }


}




const getTourPackagesByDifferentField = async (req, res) => {
 
  try {
    const { TripType, City, StartDate, Country } = req.query;

    if (TripType && Country && StartDate) {
      const [month, year] = StartDate.split(' ');
      const startOfMonth = new Date(`${month} 1, ${year}`).toISOString();
      const endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
      const packagequery = `SELECT * FROM tourpackage WHERE TripType = ? AND Country LIKE ? AND StartDate >= ? AND StartDate <= ?`;
      console.log(packagequery);
      try {
        const [data] = await pool.query(packagequery, [TripType, `%${Country}%`, startOfMonth, endOfMonth]);
        if (data.length === 0) {
          return res.send({ message: "Package not found" });
        }
        return res.send({ data: data });
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        return res.status(500).send({ error: 'Internal server error' });
      }
    }

   else if (TripType && StartDate) {
      const [month, year] = StartDate.split(' ');
      const startOfMonth = new Date(`${month} 1, ${year}`).toISOString();
      const endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
      const packagequery = `SELECT * FROM tourpackage WHERE TripType = ? AND StartDate >= ? AND StartDate <= ?`;
      console.log(packagequery);
      try {
        const [data] = await pool.query(packagequery, [TripType, startOfMonth, endOfMonth]);
        if (data.length === 0) {
          return res.send({ message: "Package not found" });
        }
        return res.send({ data: data });
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        return res.status(500).send({ error: 'Internal server error' });
      }
    }
  
    else if(City && Country){
      const packagequery = `SELECT * FROM tourpackage WHERE City LIKE? AND Country=?` ;
      console.log(packagequery)
      const [data] = await pool.query(packagequery, [`%${City}%`, Country])
      if(data.length ===0){
         return res.send({message:"package not found"})
      }
      return res.send({data:data})
    }
  
   else if(TripType && Country){
      const packagequery = `SELECT * FROM tourpackage WHERE TripType=? AND Country LIKE ?` ;
      console.log(packagequery)
      const [data] = await pool.query(packagequery, [TripType, `%${Country}%`])
      if(data.length ===0){
         return res.send({message:"package not found"})
      }
      return res.send({data:data})
    }
  
    else if(City && TripType){
      const packagequery = `SELECT * FROM tourpackage WHERE City LIKE? AND TripType=?` ;
      console.log(packagequery)
      const [data] = await pool.query(packagequery, [`%${City}%`, TripType])
      if(data.length ===0){
         return res.send({message:"package not found"})
      }
      return res.send({data:data})
    }
  
    else if(City){
      const packagequery = `SELECT * FROM tourpackage WHERE City LIKE?` ;
      console.log(packagequery)
      const [data] = await pool.query(packagequery, [`%${City}%`])
      if(data.length ===0){
         return res.send({message:"package not found"})
      }
      return res.send({data:data})
    }
  
    
    else if(TripType){
      const packagequery = `SELECT * FROM tourpackage WHERE TripType=?` ;
      console.log(packagequery)
      const [data] = await pool.query(packagequery, [TripType])
      if(data.length ===0){
         return res.send({message:"package not found"})
      }
      return res.send({data:data})
    }
 
  } catch (error) {
    console.error('Error fetching tour packages:', error);
    throw error;
  }
}


export const packageSearch =  {
  getTourPackagesByDifferentField
}

