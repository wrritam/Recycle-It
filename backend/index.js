const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());

app.use(express.json());

const port = process.env.PORT;

//B2C
app.get("/", (req, res) => res.send("this is dashboard!"));
app.use("/client", require("./routes/clientRoutes"));
app.use("/org", require("./routes/orgRoutes"));

//B2B
app.use("/digitalWarehouse/user", require("./routes/userRoutes"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "waste-management",
  })
  .then(console.log(`MongoDB connected`))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));