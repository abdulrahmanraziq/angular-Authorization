import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const MONGODB_DB = process.env.MONGODB_DB_DB;

const url = `${MONGODB_URL}/${MONGODB_DB}`;

mongoose.connect(url).then(() => {
    console.log('MongoDb Connected')
}).catch((err) => {
    console.log("MongoDb Connection Failed", err)
})

export { mongoose }