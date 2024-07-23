// leslieajayi27
// kIFrNnAy07z4ymro

import express , { Express } from "express";
import financialRecordRouter from "./routes/financial-records";
import mongoose from "mongoose";
const app: Express = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";

app.use(express.json());
// Use cors middleware
app.use(cors());

const mongoURI: string = "mongodb+srv://leslieajayi27:kIFrNnAy07z4ymro@paultech-finance.hq1mm1x.mongodb.net/"
    
mongoose
.connect(mongoURI)
.then(() => console.log("connected to mongoDB"))
.catch((err)=> console.error("Failed to connect to MongoDB" , err))


app.use("/financial-records", financialRecordRouter);


app.listen(PORT,()=> {
    console.log(`server running on ${PORT}` )
})