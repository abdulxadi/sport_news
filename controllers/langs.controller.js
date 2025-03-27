const express = require('express');
const pool = require('../config/db'); // Assuming you are using a PostgreSQL database
const { errorHandler } = require('../helpers/error_handler');

const router = express.Router();

const addNewLang = async (req, res) => {
    try {
        const { name, code } = req.body;
        const newLang = await pool.query(
            `INSERT INTO languages (name, code) VALUES ($1, $2) RETURNING *`,
            [name, code]
        );
        console.log(newLang);
        console.log(newLang.rows[0]);
        res
            .status(201)
            .send({message:"yangi til qoshildi", lang : newLang.rows[0]})
    } catch (err) {
        errorHandler(err, res);
    }
}

const getLangById = async (req, res) => {
    try {
        const { id } = req.params;
        const lang = await pool.query(
            `SELECT * FROM languages WHERE id = $1`,
            [id]
        );
        if (lang.rows.length === 0) {
            return res.status(404).send({ message: "Til topilmadi" });
        }
        res.send(lang.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const getAllLang = async (req, res) => {
    try {
        const langs = await pool.query(`SELECT * FROM languages`);
        res.send(langs.rows);
    } catch (err) {
        errorHandler(err, res);
    }
}

const updateLangById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code } = req.body;
        const updatedLang = await pool.query(
            `UPDATE languages SET name = $1, code = $2 WHERE id = $3 RETURNING *`,
            [name, code, id]
        );
        if (updatedLang.rows.length === 0) {
            return res.status(404).send({ message: "Til topilmadi" });
        }
        res.send(updatedLang.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const deleteLangById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLang = await pool.query(
            `DELETE FROM languages WHERE id = $1 RETURNING *`,
            [id]
        );
        if (deletedLang.rows.length === 0) {
            return res.status(404).send({ message: "Til topilmadi" });
        }
        res.send({ message: "Til o'chirildi", lang: deletedLang.rows[0] });
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    addNewLang,
    getLangById,
    getAllLang,
    updateLangById,
    deleteLangById
}

