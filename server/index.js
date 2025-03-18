const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

 const connectDB = require("./config/db.js");


dotenv.config();
 connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(
    `Server is running on port no ${PORT}`
  );
});