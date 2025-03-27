const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks } = req.body;
    const newUser = await pool.query(  
      `
            INSERT INTO users(first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `,
      [first_name, last_name, email, password, role, is_active, created_at, interests, bookmarks]
    );
    console.log(newUser);
    console.log(newUser.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi user qo'shildi", user: newUser.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const newUser = await pool.query(
      `
        SELECT * FROM users
    `
    );
    res.status(200).send({ message: "Barcha user", user: newUser.rows  });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const newUser = await pool.query(
      `
            SELECT * FROM users WHERE id=($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({ message: `${id} id li language`, language: newUser.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const newUser = await pool.query(
      `
            DELETE FROM users WHERE id = ($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({
        message: `${id} id li user o'chirildi`,
        language: newUser.rows[0],
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  deleteUserById,
};
