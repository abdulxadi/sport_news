const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewCategory = async (req, res) => {
  try {
    const { category_name, description, parent_id } = req.body;
    const newCategory = await pool.query(  
      `
            INSERT INTO category(category_name, description, parent_id)
            VALUES ($1, $2, $3) RETURNING *
            `,
      [category_name, description, parent_id]
    );
    console.log(newCategory);
    console.log(newCategory.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi category qo'shildi", category: newCategory.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategorys = async (req, res) => {
  try {
    const newCategory = await pool.query(
      `
        SELECT * FROM category
    `
    );
    res.status(200).send({ message: "Barcha category", category: newCategory.rows  });
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const newCategory = await pool.query(
      `
            SELECT * FROM category WHERE id=($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({ message: `${id} id li language`, language: newCategory.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const newCategory = await pool.query(
      `
            DELETE FROM category WHERE id = ($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({
        message: `${id} id li category o'chirildi`,
        language: newCategory.rows[0],
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewCategory,
  getAllCategorys,
  getCategoryById,
  deleteCategoryById,
};
