const express = require('express');
const pool = require('../config/db'); // Assuming you are using a PostgreSQL database
const { errorHandler } = require('../helpers/error_handler');


const addNewNewsWithLang = async (req, res) => {
    try {
        const { title, content, lang_id } = req.body;
        const newNewsWithLang = await pool.query(
            `INSERT INTO news_with_langs (title, content, lang_id) VALUES ($1, $2, $3) RETURNING *`,
            [title, content, lang_id]
        );
        console.log(newNewsWithLang);
        console.log(newNewsWithLang.rows[0]);
        res
            .status(201)
            .send({message:"Yangi yangilik qo'shildi", news: newNewsWithLang.rows[0]});
    } catch (err) {
        errorHandler(err, res);
    }
}

const getNewsWithLangById = async (req, res) => {
    try {
        const { id } = req.params;
        const newsWithLang = await pool.query(
            `SELECT * FROM news_with_langs WHERE id = $1`,
            [id]
        );
        if (newsWithLang.rows.length === 0) {
            return res.status(404).send({ message: "Yangilik topilmadi" });
        }
        res.send(newsWithLang.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const getAllNewsWithLang = async (req, res) => {
    try {
        const newsWithLangs = await pool.query(`SELECT * FROM news_with_langs`);
        res.send(newsWithLangs.rows);
    } catch (err) {
        errorHandler(err, res);
    }
}

const updateNewsWithLangById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, lang_id } = req.body;
        const updatedNewsWithLang = await pool.query(
            `UPDATE news_with_langs SET title = $1, content = $2, lang_id = $3 WHERE id = $4 RETURNING *`,
            [title, content, lang_id, id]
        );
        if (updatedNewsWithLang.rows.length === 0) {
            return res.status(404).send({ message: "Yangilik topilmadi" });
        }
        res.send(updatedNewsWithLang.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const deleteNewsWithLangById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNewsWithLang = await pool.query(
            `DELETE FROM news_with_langs WHERE id = $1 RETURNING *`,
            [id]
        );
        if (deletedNewsWithLang.rows.length === 0) {
            return res.status(404).send({ message: "Yangilik topilmadi" });
        }
        res.send({ message: "Yangilik o'chirildi", news: deletedNewsWithLang.rows[0] });
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    addNewNewsWithLang,
    getNewsWithLangById,
    getAllNewsWithLang,
    updateNewsWithLangById,
    deleteNewsWithLangById
}