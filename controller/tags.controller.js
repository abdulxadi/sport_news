const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewTag = async (req, res) => {
  try {
    const { tag_name, description } = req.body;
    const newTag = await pool.query(  
      `
            INSERT INTO tags(tag_name, description)
            VALUES ($1, $2) RETURNING *
            `,
      [tag_name, description]
    );
    console.log(newTag);
    console.log(newTag.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi tag qo'shildi", tag: newTag.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllTags = async (req, res) => {
  try {
    const newTag = await pool.query(
      `
        SELECT * FROM tags
    `
    );
    res.status(200).send({ message: "Barcha tags", tags: newTag.rows  });
  } catch (error) {
    console.log(error);
  }
};

const getTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const newTag = await pool.query(
      `
            SELECT * FROM tags WHERE id=($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({ message: `${id} id li language`, language: newTag.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const deleteTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const newTag = await pool.query(
      `
            DELETE FROM tags WHERE id = ($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({
        message: `${id} id li tag o'chirildi`,
        language: newTag.rows[0],
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewTag,
  getAllTags,
  getTagById,
  deleteTagById,
};
