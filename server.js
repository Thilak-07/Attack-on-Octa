const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require("./routes/user.js");
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use("/", userRouter);

const CONNECTION_URL = 'mongodb+srv://Elliot:mongoDB02@elliotcluster.kjdcr.mongodb.net/Hackathon?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Server Running on Port: http://localhost:${PORT}`)
  }))
  .catch((error) => console.log(`${error} did not connect`));