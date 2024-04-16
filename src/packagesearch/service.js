
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





const getTourPackagesByDifferentField = async (req,res)=> {

  const { TripType, City, StartDate, Country } = req.query;

  let packagequery = 'SELECT * FROM tourpackage WHERE 1=1';
  const params = [];

  if (TripType) {
    packagequery += ' AND TripType = ?';
    params.push(TripType);
  }

  if (City) {
    packagequery += ' AND City = ?';
    params.push(City);
  }

  if (StartDate) {
    const [month, year] = StartDate.split(' ');
    const startOfMonth = new Date(`${month} 1, ${year}`).toISOString();
    const endOfMonth = new Date(new Date(startOfMonth).getFullYear(), new Date(startOfMonth).getMonth() + 1, 0).toISOString();
    packagequery += ' AND StartDate >= ? AND StartDate <= ?';
    params.push(startOfMonth, endOfMonth);
  }

  if (Country) {
    packagequery += ' AND Country = ?';
    params.push(Country);
  }

  try {
    const result = await pool.query(packagequery, params);
    return result;
  } catch (error) {
    console.error('Error fetching tour packages:', error);
    throw error;
  }
}

export const packageSearch =  {
  getTourPackagesByDifferentField
}

