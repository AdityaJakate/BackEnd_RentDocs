const pool = require("../config/config");
const { response } = require("../utils/response");

const imagePath = `http://10.31.0.215:9005/uploads/`;

// Insert new doc
const insertDoc = async (req, res) => {
  try {
    const { name, mobile, address, email } = req.body;
    const image = req.file ? req.file.filename : null;

    let query = `INSERT INTO docs (name, mobile, address, image, user_number) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    let values = [name, mobile, address, image, email];
    let result = await pool.query(query, values);

    return response(res, 200, "Document inserted successfully", result.rows[0]);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Error inserting document", {});
  }
};

// Get all docs for a user
const getDocs = async (req, res) => {
  try {
    let query = `SELECT docid, name, mobile, address, '${imagePath}' || image as image, user_number  
                 FROM docs WHERE user_number = $1`;
    let values = [req.body.number];

    let data = await pool.query(query, values);
    return response(res, 200, "Documents retrieved", data.rows);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Error retrieving documents", {});
  }
};

// Update doc
const updateDoc = async (req, res) => {
  try {
    const { id, name, mobile, address } = req.body;
    let query = `UPDATE docs SET name=$1, mobile=$2, address=$3 WHERE id=$4 RETURNING *`;
    let values = [name, mobile, address, id];

    let result = await pool.query(query, values);
    return response(res, 200, "Document updated", result.rows[0]);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Error updating document", {});
  }
};

// Delete doc
const deleteDoc = async (req, res) => {
  try {
    const { id } = req.body;
    let query = `DELETE FROM docs WHERE id=$1 RETURNING *`;
    let values = [id];

    let result = await pool.query(query, values);
    return response(res, 200, "Document deleted", result.rows[0]);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Error deleting document", {});
  }
};

module.exports = { insertDoc, getDocs, updateDoc, deleteDoc };
