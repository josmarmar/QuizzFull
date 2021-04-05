

//----------Const&Vars

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const md5 = require("md5"); 

const jwt =  require("jsonwebtoken");
const {nanoid} = require("nanoid")



//-------ModelVars

const userSchema = new mongoose.Schema({
    user: { 
        type: String,
        required: true, 
        unique: true
    }, 
    pass: {
        type: String,
        required: true,
        
        },
    secret : {
        type: String

        }
    }
)

const userModel = mongoose.model("User", userSchema);
// ^^ ("nombre que creamos para el modelo", el esquema que usamos para estructurar el modelo)

//--------Middleware
mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//----HTTP

app.get ("/status", (req, res) => {
    return res.send("User area attached!")
    }
)
//^^ Prueba de estado.

app.post("/sign-up", async (req, res) =>{
    try {
        let user = req.body.user;
        let pass = md5(req.body.pass);

            let secret = nanoid(10);
    
        const newUser = new userModel({user, pass, secret})
        res.send({result: "User added"})

            let userUp = await newUser.save();

    } catch(err) {
        console.log("Salió por catch", err)
        res.status(500).send({result: "User no added"})

        }
    }
)

app.post("/sign-in", async (req, res) => {

        let user = req.body.user;
        let pass = req.body.pass;

    try {
        const responseDB = await userModel.findOne({user, pass});

            if(responseDB === null){
                console.log("User no found");
                res.status(404).send("User no found")
            
            } else {
                const token = jwt.sign({user}, responseDB.secret, {expireIn: "86000s"});
                res.json(token);
                
            } 
    } catch { 
            console.log("No se ha podido acceder a la base de datos");
            res.send("No se ha podido acceder a la base de datos");
       
        }   

    }
)

app.get("/teacherArea", async (req, res) => {

        let autHead = req.headers.authorization;

            if(autHead){
                let tokenSplit = autHead.split(" ")[1];
                let decode = jwt.decode(tokenSplit);
                const secretDB = await userModel.findOne(
                    {user: decode.user})
                    console.log(decode.user);
                    
                    jwt.verify(tokenSplit, secretDB.secret, (err, user) =>{
                        if(err){
                            return res.status(403).send("Fake Token, dial the FBI!")

                        } else {
                            res.send("Token!")
                        }
                    }
                )
            } else {
                res.sendStatus(401)

        }
    }
    
)

app.get("/log-out", async (req, res) =>{

    try{
        let user = req.body.user;
        let pass = req.body.pass;

        let secretId = nanoid(10)

        let authHead = req.headers.authorization;
        let tokenSplit = authHead.split(" ")[1];
        let decode =  jwt.decode(tokenSplit);
        const secretDB = await userModel.updateOne({user: decode.user} ,{secret:secretId});
        
        res.redirect(301, "http://localhost:8080/");
    }

    catch(err){
        res.status(404).send("Salió por el catch");
        console.log(err)
        }
    }
)

