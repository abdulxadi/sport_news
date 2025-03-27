const express = require('express');
const pool = require('../config/db'); // Assuming you are using a PostgreSQL database
const { errorHandler } = require('../helpers/error_handler');

const router = express.Router();

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await pool.query(
            `INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *`,
            [name, description]
        );
        res
            .status(201)
            .send({ message: "Yangi kategoriya qo'shildi", category: newCategory.rows[0] });
    } catch (err) {
        errorHandler(err, res);
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await pool.query(
            `SELECT * FROM categories WHERE id = $1`,
            [id]
        );
        if (category.rows.length === 0) {
            return res.status(404).send({ message: "Kategoriya topilmadi" });
        }
        res.send(category.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await pool.query(`SELECT * FROM categories`);
        res.send(categories.rows);
    } catch (err) {
        errorHandler(err, res);
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await pool.query(
            `UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *`,
            [name, description, id]
        );
        if (updatedCategory.rows.length === 0) {
            return res.status(404).send({ message: "Kategoriya topilmadi" });
        }
        res.send(updatedCategory.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await pool.query(
            `DELETE FROM categories WHERE id = $1 RETURNING *`,
            [id]
        );
        if (deletedCategory.rows.length === 0) {
            return res.status(404).send({ message: "Kategoriya topilmadi" });
        }
        res.send({ message: "Kategoriya o'chirildi", category: deletedCategory.rows[0] });
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    addCategory,
    getCategoryById,
    getAllCategories,
    updateCategoryById,
    deleteCategoryById
}
