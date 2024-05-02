import pool from "../database/db"






const addPartner = async (req, res) => {
  const {
    partnerName,
    offerFor,
    validationDate,
    description,
    tier1,
    goldUserDiscount,
    tier2,
    silverUserDiscount,
    tier3,
    platinumUserDiscount,
    isActive
  } = req.body;




  console.log(values)


  let firstImage;
  if (req.files.firstImage) {
    // Handle each image here, upload to S3 or save locally
    // Example: const imageUrl = await uploadImageToS3(req.files.blogimages[i]);
    firstImage = req.imageLink
  }


  let secondImage;
  if (req.files.secondImage) {
    // Handle second image here
    // Example: const secondImageUrl = await uploadImageToS3(req.files.secondimage[0]);
    secondImage = req.imageLink
  }

  let thirdImage;
  if (req.files.thirdImage) {
    // Handle second image here
    // Example: const secondImageUrl = await uploadImageToS3(req.files.secondimage[0]);
    thirdImage = req.imageLink
  }

  const values = [
    partnerName,
    offerFor,
    validationDate,
    description,
    firstImage,
    secondImage,
    thirdImage,
    tier1,
    goldUserDiscount,
    tier2,
    silverUserDiscount,
    tier3,
    platinumUserDiscount,
    isActive
  ];

  const query = `
    INSERT INTO partner 
    (partnerName, offerFor, validationDate, description, firstImage, secondImage, thirdImage, tier1, goldUserDiscount, tier2, silverUserDiscount, tier3, platinumUserDiscount, isActive)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await pool.query(query, values);
    res.status(200).json({ status: 'success', message: 'Partner created successfully' });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred while creating blog' });
  }

}

const getallPartner = async (req, res) => {
  const query = `SELECT * FROM  partner`
  const [data] = await pool.query(query)
  return res.send({ data: data });
}


const deletepartner = async (req, res) => {
  const id = req.params.id
  const deleteQuery = `DELETE  FROM partner WHERE id=? `
  await pool.query(deleteQuery, [id])
  return res.send({ status: 'success', message: "partner has  deleted" })
}


const updatePartner = async (req, res) => {
  const id = req.params.id;
  const {
    partnerName,
    offerFor,
    validationDate,
    description,
    tier1,
    goldUserDiscount,
    tier2,
    silverUserDiscount,
    tier3,
    platinumUserDiscount,
    isActive
  } = req.body;
  const updatePartner = {
    partnerName,
    offerFor,
    validationDate,
    description,
    tier1,
    goldUserDiscount,
    tier2,
    silverUserDiscount,
    tier3,
    platinumUserDiscount,
    isActive
  };

  if (req.firstImage) updatePartner.firstImage = req.firstImage
  if (req.secondImage) updatePartner.secondImage = req.secondImage
  if (req.thirdImage) updatePartner.thirdImage = req.thirdImage

  const updateQuery = `UPDATE partner SET ? WHERE id=?`;
  const [data] = await pool.query(updateQuery, [updatePartner, id]);

  // Check if any rows were affected
  if (data.affectedRows === 0) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }

  return res.status(200).json({ success: true, message: 'Blog updated successfully' });


}


export const PartnerService = {
  addPartner,
  getallPartner,
  deletepartner,
  updatePartner
}