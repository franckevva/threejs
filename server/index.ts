import * as express from "express";
import * as cors from "cors";
import { json } from "body-parser";
import * as dotenv from 'dotenv';
import * as path from 'path';

import { sceneRouter } from "./routes/scene";
import connect from "./db/connect";

dotenv.config();
const port = Number(process.env.PORT) || 8000;
const host = process.env.HOST || "localhost";
const allowedOrigins = ["http://localhost:4200", "http://localhost:8000", process.env.URL as string];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors(options));
app.use(json());

const pathLocal = path.join(__dirname, "../public");
app.use(express.static(pathLocal));

app.get("/", (req, res) => {
  res.sendFile(pathLocal + "index.html");
});

app.use(sceneRouter);

connect();

app.listen(port, host, () => {
  console.log(`server is listening on port: http://${host}:${port}`);
});
