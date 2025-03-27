const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addNewLang = async (req, res) => {
  try {
    const { name, code } = req.body;
    const newLang = await pool.query(
      `
            INSERT INTO languages(name, code)
            VALUES ($1, $2) RETURNING *
            `,
      [name, code]
    );
    console.log(newLang);
    console.log(newLang.rows[0]);
    res
      .status(201)
      .send({ message: "Yangi til qo'shildi", lang: newLang.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllLangs = async (req, res) => {
  try {
    const newLang = await pool.query(
    `
        SELECT * FROM languages
    `
    );
    res.status(200).send({message: "Barcha languages", languages: newLang.rows})
  } catch (error) {
    console.log(error);
  }
};

const getLangById = async (req, res)=>{
    try {
        const id = req.params.id
        const newLang = await pool.query(
            `
            SELECT * FROM languages WHERE id=($1)
            `,[id]
        )
        res.status(200).send({message: `${id} id li language`, language: newLang.rows[0]})
    } catch (error) {
    console.log(error);
    }
}

const deleteLangById = async(req, res)=>{
    try {
        const id = req.params.id
        const newLang = await pool.query(
            `
            DELETE FROM languages WHERE id = ($1)
            `,[id]
        )
        res.status(200).send({message: `${id} id li foydalanuchi o'chirildi`, language: newLang.rows[0]})
    } catch (error) {
    console.log(error);
    }
}

module.exports = {
  addNewLang,
  getAllLangs,
  getLangById,
  deleteLangById
};
