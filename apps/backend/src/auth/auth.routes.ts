import express from 'express';
const app = express();
import prisma from '../config/db.js';

app.post("/api/signup", (req, res) => {
    const { name, email, password } = req.body;

    prisma.
})


