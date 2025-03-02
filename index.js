import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import CookieParser from 'cookie-parser'
import chatRouter from "./routes/chatRouter.js";
import { errorHandler, notFound } from "./middlewares/errors.js";
import userRouter from "./routes/userRouter.js";
import StationRouter from "./routes/stationRouter.js";
import Bookingrouter from "./routes/bookingsRouter.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(CookieParser());


app.use(express.json());

app.use(helmet());
app.use((req, res, next) => {
    res.removeHeader('Server');
    next();
});

const PORT = process.env.PORT;
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://www.oser.ai',
        'https://oser.ai',
        'https://chatbot-backend-1mld.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Content-Type-Options',
        'Cookie',
        'Accept',
        'Origin',
        'X-Requested-With'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400 // 24 hours
}));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};
connectDB();

app.get('/api/chat', (req, res) => {
    res.status(200)
        .json({
            status: "success"
        });
});


app.use("/api/chat/", chatRouter);
app.use('/api/user', userRouter);
app.use('/api/station', StationRouter);
app.use('/api/booking', Bookingrouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT || process.env.PORT, (req, res) => {
    console.log(`server is running at port ${PORT}`);
});