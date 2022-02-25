const express = require("express");
const dotenv =  require("dotenv");
const cors = require("cors");
const morgan = require("morgan")
const bodyParser =require("body-parser")
const mongoose = require("mongoose")
const auth = require('./routes/auth.routes');
const app = express();
dotenv.config({path:"./config.env"})

const PORT = process.env.PORT || 8000;

const db = process.env.DATABASE;

mongoose.connect(db,() => ({
    useNewUrlParser:true,
    useFindAndModify:false
})).then(console.log('DB Connected'))
.catch((err)=>{
    console.log('connection failed');
});
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
);

app.get("/",(req,res) => {
    res.send("WELCOME TO SERVER !!!! ALL SYSTEM OPERATIONAL !!!!")
})
app.use('/api',auth)

app.listen(PORT, () =>
  console.log(
    `your application is running on http://localhost:${PORT}`
  )
);
