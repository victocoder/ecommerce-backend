import express, { Request, Response } from "express";
import http from 'http'
import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from 'cors'
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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
