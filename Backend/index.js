import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"


const PORT = process?.env?.PORT || 10000;
const app = express();
app.use(express());
app.use(cors())


app.use("/*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "path not found!!"
    })
})



app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))