import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import CookieParser from 'cookie-parser'
import chatRouter from "./routes/chatRouter.js";
import { errorHandler, notFound } from "./middlewares/errors.js";


dotenv.config();
const app = express();
app.use(CookieParser());


app.use(express.json());

app.use(helmet());
app.use((req, res, next) => {
    // Iterate through all the headers
    Object.entries(req.headers).forEach(([header, value]) => {
        // Log each header and its value
        //logger.info(`Header: ${header}, Value: ${value}`);
    });

    // Remove the "Server" header
    res.removeHeader('Server');

    // Log the removal of the header
    //logger.info('Removed "Server" header from the response');

    next();
});

const PORT = process.env.PORT;
app.use(cors({
    origin: ['https://www.fortitudemobility.com',  'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Content-Type-Options'],
    credentials: true
}));

app.get('/api/chat', (req, res) => {
    res.status(200)
        .json({
            status: "success"
        });
});


app.use("/api/chat/", chatRouter);
// app.use("/api/users", feedbackRouter);
app.use(notFound);
app.use(errorHandler);
app.use(express.json())

app.listen(PORT || process.env.PORT, (req, res) => {
    console.log(`server is running at port ${PORT}`);
});
