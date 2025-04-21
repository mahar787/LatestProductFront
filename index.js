const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const DBCON = require("./Database/Db.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DBCON();
//files
const addProduct = require("./routes/addProduct.js");
const addCategory = require("./routes/addCategory.js");
const getParentCategories = require("./routes/getParentCategories.js");
const getCategories = require("./routes/getCategories.js");
//files
//routes
app.use("/api/addProduct", addProduct);
app.use("/api/addCategory", addCategory);
app.use("/api/getParentCategories", getParentCategories);
app.use("/api/getCategories", getCategories);
//routes
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is Running!");
});
