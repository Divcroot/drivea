import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initDB } from './config/db.js';

const app = express();

const port = process.env.PORT || 5000;

//CORS configuration
const allowedOrigins = process.env.ORIGINS.split(",");
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

//Middlewares
app.use(cookieParser())
app.use(express.json({
    limit: "100mb"
}))

//Root API
app.get("/", (_req, res) => res.send("Server is running"));

//Error Handling Middleware
app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({ error: err.message || "Something went wrong!" })
})

//Initialize Database Connection then start the server
initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
})