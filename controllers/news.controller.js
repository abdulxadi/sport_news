const express = require('express');
const pool = require('../config/db'); // Assuming you are using a PostgreSQL database
const { errorHandler } = require('../helpers/error_handler');

const router = express.Router();

const addNewNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNews = await pool.query(
            `INSERT INTO news (title, content) VALUES ($1, $2) RETURNING *`,
            [title, content]
        );
        res
            .status(201)
            .send({ message: "Yangi yangilik qo'shildi", news: newNews.rows[0] });
    } catch (err) {
        errorHandler(err, res);
    }
}

const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await pool.query(
            `SELECT * FROM news WHERE id = $1`,
            [id]
        );
        if (news.rows.length === 0) {
            return res.status(404).send({ message: "Yangilik topilmadi" });
        }
        res.send(news.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const getAllNews = async (req, res) => {
    try {
        const news = await pool.query(`SELECT * FROM news`);
        res.send(news.rows);
    } catch (err) {
        errorHandler(err, res);
    }
}

const updateNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNews = await pool.query(
            `UPDATE news SET title = $1, content = $2 WHERE id = $3 RETURNING *`,
            [title, content, id]
        );
        if (updatedNews.rows.length === 0) {
            return res.status(404).send({ message: "Yangilik topilmadi" });
        }
        res.send(updatedNews.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const deleteNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNews = await pool.query(
            `DELETE FROM news WHERE id = $1 RETURNING *`,
            [id]
        );
        if (deletedNews.rows.length === 0) {
            return res.status(404).send({ message: "Yangilik topilmadi" });
        }
        res.send({ message: "Yangilik o'chirildi", news: deletedNews.rows[0] });
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    addNewNews,
    getNewsById,
    getAllNews,
    updateNewsById,
    deleteNewsById
}
