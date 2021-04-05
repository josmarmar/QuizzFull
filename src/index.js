//--------------Const&Vars+Requires

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Quizz", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connections


const dotenv = require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/routes");

let PORT = process.env.PORT || 8080; 
// dotenv vuelve a fallar....



//-----Middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());
app.use(routes);



//---Server

app.listen(PORT, console.log(`You're running on 8080 `))
// Aquí hay un fallito con el dotenv, no se entienden, luego lo corregimos.






//-------Obsrv.

// A ver si nos acostumbramos a ponerle el nombre en minúsculas al proyecto, que luego da warnings.
// Nombre en minúsculas para todo: db, proyectos