import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();


//Middleware for parsing the request body
app.use(express.json());

//Middleware for handling CORS
//Option 1: Allow All Origins with Default  of cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//  })
// );

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to the server!");
});

app.use('/books',bookRoute);


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to the database");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.log(error)
    });