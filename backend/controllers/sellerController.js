const asyncHandler = require('express-async-handler');
const pool = require('../config/dbConn');

// Check if the Customer table exists, if not, create it
const checkAndCreateTable = async () => {
	try {
	  const checkTableQuery = 'SELECT * FROM information_schema.tables WHERE table_name = $1';
	  const result = await pool.query(checkTableQuery, ['Seller']);
  
	  if (result.rows.length === 0) {
		// The table doesn't exist, create it
		const createTableQuery = `
		CREATE TABLE Seller(
			seller_id SERIAL PRIMARY KEY,
			seller_username VARCHAR(255),
			seller_name VARCHAR(255),
			seller_password VARCHAR(100),
			seller_email VARCHAR(255)
		);
			  `;
		await pool.query(createTableQuery);
		console.log('Customer table created successfully');
	  }
	} catch (error) {
	  console.error('Error checking/creating Customer table:', error.message);
	}
  };
  
  // Call the function to check and create the table when the application starts
  checkAndCreateTable();

const getAllSellers = asyncHandler(async (req, res) => {
    const allSellerQuery = 'SELECT * FROM Seller';
    const allSeller = await pool.query(allSellerQuery)

    if (!allSeller.rows.length) {
		return res.status(400).json({ message: 'No seller found' });
	}
	res.json(allSeller.rows);
})

const getSellerById = asyncHandler(async (req, res) => {
	const { seller_id } = req.params

	const getSellerQuery = 'SELECT *FROM Seller WHERE seller_id = $1'
	const getSeller = await pool.query(getSellerQuery, [seller_id])

	if(!getSeller.rows.length) {
		return res.status(400).json({ message: 'No seller found'})
	}
	res.json(getSeller.rows)
})

const createSeller = asyncHandler(async (req, res) => {
    const { seller_username, seller_name, seller_password, seller_email } = req.body;

    // Confirm data
	if (!seller_name || !seller_username || !seller_password || !seller_email) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// Check for duplicate username
	const duplicateQuery = 'SELECT * FROM Seller WHERE seller_username = $1';
	const duplicateSeller = await pool.query(duplicateQuery, [seller_username]);

	if (duplicateSeller.rows.length > 0) {
        return res.status(409).json({ message: 'The seller username has been used' });
    }

    // Create new user
    const insertQuery = 'INSERT INTO Seller (seller_name, seller_username, seller_password, seller_email) VALUES ($1, $2, $3, $4) RETURNING *';
    const newSeller = await pool.query(insertQuery, [seller_name, seller_username, seller_password, seller_email]);

    if (newSeller.rows.length > 0) {
        res.status(201).json({ message: `New seller ${seller_username} created` });
    } else {
        res.status(400).json({ message: 'Invalid seller data received' });
    }
})

const updateSeller = asyncHandler(async (req, res) => {
    const { seller_id, seller_name, seller_username, seller_password, seller_email } = req.body;

	// Confirm data
	if (!seller_username || !seller_name || !seller_password || !seller_email) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	// Does user exist to update?
	const getSellerQuery = 'SELECT * FROM Seller WHERE seller_id = $1';
	const seller = await pool.query(getSellerQuery, [seller_id]);

	if (!seller.rows.length > 0) {
		return res.status(404).json({ message: 'Seller not found' });
	}

	// Check for duplicate usernames
	const duplicateQuery = 'SELECT * FROM Seller WHERE seller_username = $1 AND seller_id <> $2';
	const duplicate = await pool.query(duplicateQuery, [seller_username, seller_id]);

	if (duplicate.rows.length > 0) {
		return res.status(409).json({ message: 'Duplicate  seller username' });
	}

	// Update the user
	const updatedSellerQuery = 'UPDATE Seller SET seller_username = $1, seller_password = $2, seller_email = $3, seller_name = $4 WHERE seller_id = $5 RETURNING *';
	const updatedSeller = await pool.query(updatedSellerQuery, [seller_username, seller_password, seller_email, seller_name, seller_id]);

	res.json({ message: `${seller_username} updated` });
})

module.exports = {
    getAllSellers,
	getSellerById,
    createSeller,
    updateSeller
}