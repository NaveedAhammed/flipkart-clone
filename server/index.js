import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from "./database/db.js";
import Router from './routes/route.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

Connection();

app.listen(8001, () => {
    console.log("server running at 8001");
})