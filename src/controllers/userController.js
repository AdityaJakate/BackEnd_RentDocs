const pool = require("../config/config");
const { response } = require("../utils/response");

// Check if user exists
const getUserExists = async (req, res) => {
  try {
    let query = `SELECT * FROM docs_users WHERE mobile_number = $1`;
    let values = [req.body.id];

    let data = await pool.query(query, values);
    return response(res, 200, "User checked", { exists: data.rowCount > 0 });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Error checking user", {});
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const { id, name, state, district, talukas, villages, password } = req.body;
    let query = `INSERT INTO docs_users (mobile_number, name, state, district, taluka, goan, docs_digits) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    let values = [id, name, state, district, talukas, villages, password];

    let result = await pool.query(query, values);
    return response(res, 200, "User created", result.rows[0]);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Error creating user", {});
  }
};

const loginUser = async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return response(res, 400, "Mobile number/email and password are required", {});
    }

    const query = `SELECT * FROM docs_users WHERE mobile_number = $1 AND docs_digits = $2`;
    const values = [id, password];

    const data = await pool.query(query, values);

    if (data.rowCount > 0) {
      // Optionally, exclude password in response
      const user = data.rows[0];
      delete user.password;

      return response(res, 200, "Login successful", { user });
    } else {
      return response(res, 401, "Invalid credentials", {});
    }

  } catch (error) {
    console.error("Login error:", error);
    return response(res, 500, "Server error during login", {});
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("here-->",id)

    const query = `SELECT * FROM docs_users WHERE mobile_number = $1`;
    const values = [id];

    const result = await pool.query(query, values);
    console.log("here--> result",result)

    if (result.rowCount > 0) {
      return response(res, 200, "User found", result.rows[0]);
    } else {
      return response(res, 404, "User not found", {});
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return response(res, 500, "Error fetching user details", {});
  }
};



module.exports = { getUserExists, createUser, loginUser, getUserDetails };
