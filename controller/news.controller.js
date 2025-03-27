const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewNew = async (req, res) => {
  try {
    const { news_id, category_id, author_id, status, published_at, source, lang_id } = req.body;
    const newNew = await pool.query(  
      `
            INSERT INTO news(news_id, category_id, author_id, status, published_at, source, lang_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
            `,
      [news_id, category_id, author_id, status, published_at, source, lang_id]
    );
    console.log(newNew);
    console.log(newNew.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi new qo'shildi", new: newNew.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNews = async (req, res) => {
  try {
    const newNew = await pool.query(
      `
        SELECT * FROM news
    `
    );
    res.status(200).send({ message: "Barcha new", new: newNew.rows  });
  } catch (error) {
    console.log(error);
  }
};

const getNewById = async (req, res) => {
  try {
    const id = req.params.id;
    const newNew = await pool.query(
      `
            SELECT * FROM news WHERE id=($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({ message: `${id} id li language`, language: newNew.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const deleteNewById = async (req, res) => {
  try {
    const id = req.params.id;
    const newNew = await pool.query(
      `
            DELETE FROM news WHERE id = ($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({
        message: `${id} id li new o'chirildi`,
        language: newNew.rows[0],
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewNew,
  getAllNews,
  getNewById,
  deleteNewById,
};
