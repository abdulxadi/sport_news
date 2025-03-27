const express = require('express');
const pool = require('../config/db'); // Assuming you are using a PostgreSQL database
const { errorHandler } = require('../helpers/error_handler');

const router = express.Router();

const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await pool.query(
            `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
            [name, email]
        );
        console.log(newUser);
        console.log(newUser.rows[0]);
        res
            .status(201)
            .send({message:"New user added", user : newUser.rows[0]})
    } catch (err) {
        errorHandler(err, res);
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        if (user.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await pool.query(`SELECT * FROM users`);
        res.send(users.rows);
    } catch (err) {
        errorHandler(err, res);
    }
}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const updatedUser = await pool.query(
            `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`,
            [name, email, id]
        );
        if (updatedUser.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(updatedUser.rows[0]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await pool.query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [id]
        );
        if (deletedUser.rows.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send({ message: "User deleted", user: deletedUser.rows[0] });
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    addUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById
}