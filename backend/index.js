import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import router from "./router/bookRouters.js";
import cors from 'cors';



const app = express();
app.use(express.json());
app.use(cors());

app.use('/books', router); 



mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`App is running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
