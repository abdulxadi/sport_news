const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewNews_with_lang = async (req, res) => {
  try {
    const { title, content, summary_news, lang_id } = req.body;
    const newNews_with_lang = await pool.query(  
      `
            INSERT INTO news_with_lang(title, content, summary_news, lang_id)
            VALUES ($1, $2, $3, $4) RETURNING *
            `,
      [title, content, summary_news, lang_id]
    );
    console.log(newNews_with_lang);
    console.log(newNews_with_lang.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi news_with_lang qo'shildi", news_with_lang: newNews_with_lang.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNews_with_langs = async (req, res) => {
  try {
    const newNews_with_lang = await pool.query(
      `
        SELECT * FROM news_with_lang
    `
    );
    res.status(200).send({ message: "Barcha news_with_lang", news_with_lang: newNews_with_lang.rows  });
  } catch (error) {
    console.log(error);
  }
};

const getNews_with_langById = async (req, res) => {
  try {
    const id = req.params.id;
    const newNews_with_lang = await pool.query(
      `
            SELECT * FROM news_with_lang WHERE id=($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({ message: `${id} id li language`, language: newNews_with_lang.rows[0] });
  } catch (error) {
    console.log(error);
  }
};

const deleteNews_with_langById = async (req, res) => {
  try {
    const id = req.params.id;
    const newNews_with_lang = await pool.query(
      `
            DELETE FROM news_with_lang WHERE id = ($1)
            `,
      [id]
    );
    res
      .status(200)
      .send({
        message: `${id} id li news_with_lang o'chirildi`,
        language: newNews_with_lang.rows[0],
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewNews_with_lang,
  getAllNews_with_langs,
  getNews_with_langById,
  deleteNews_with_langById,
};
