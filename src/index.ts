import express, { Request, Response } from "express";
import http from 'http'
import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors'
import connectMongoDb from "./config/connectMongoDb";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userRoute from './routes/userRoute'
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
const options: swaggerJSDoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'API documentation for your Express application',
      },
      servers: [
        {
          url: 'http://localhost:3000', // Change based on your environment
        },
      ],
    },
    apis: ['src/routes/*.ts'], // Point to route files where docs are written
  };

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/user',userRoute)
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
