const express = require("express");
// const joi = require("joi");

require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const products = require("./routes/products");
const carts = require("./routes/carts");
const cors = require("cors");

// const lodash = require("lodash");

const PORT = process.env.PORT || 8888;
const app = express();

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("Connected successfuly"))
    .catch((error) => console.log(error));


app.use(express.json());
app.use(cors());
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/products", products);
app.use("/api/carts", carts);



app.listen(PORT, () => console.log("Server started on port", PORT))