/*const express = require('express')
const app = express()
let poruke = [
// ...
]
app.get('/', (req, res) =>{
 res.send('<h1>Pozdrav od Express servera</h1>')
})
app.get('/api/poruke', (req, res) =>{
 res.json(poruke)
})
const PORT = 3001
app.listen(PORT, () => {
 console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})*/

const express=require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("DBConnection Successfull!"))
.catch((err)=>{console.log(err)});

app.use(express.json());

app.use("/api/users", userRoute);

app.listen(process.env.PORT || 3001, () => {
    console.log("Backend serer is running");
})