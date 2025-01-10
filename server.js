require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("bodyParser");


const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,{
    UseNewUrlPraser: true,
    UseUifiedTopology: true,
})
.then(()=> console.log('Connected'))
.then((err)=> console.log('connection err', err) );

app.use('./api/stories', require ('./routes/storyRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on ${PORT}`));
