import express, { Request, Response } from "express";
import http from 'http'
import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors'
import connectMongoDb from "./config/connectMongoDb";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
    credentials:true,
}))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});
connectMongoDb()
mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');
    // await userController.createRootUser();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
    // logEvents(
    //     `${err.name}: ${err.message}\t${err.syscall}\t${err.hostname}`,
    //     'mongoErrLog.log'
    // );
});

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
