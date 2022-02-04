import express, { Router } from 'express';
import mongoose from "mongoose";
import urlencoded from 'body-parser';
import { UserModel } from './models/UserModel.js';
import { Company } from './models/CompanyModel.js';
import signJwt from './jwt.js';
import verifyJwt from './jwt.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import 'dotenv/config';



const app = express();

const db = mongoose.connect("mongodb://localhost:27017/chocolatedb") // pise chocolatedb jer mi jedino radi za dohvat podataka iz te davno kreirane 

const port = 5000;

const craftProducts = express.Router();
const userRouter = express.Router();

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use('/', craftProducts)

// 1. komandna linija: Podizanje MongoDB na svom računalu ("C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="c:\data\db")
// 2. komandna linija: Pokrenuti projekt sa skriptom start (npm start)

// localhost:5000/api/

//npm start app.js

app.get('/', (req, res) => {
    res.send("Welcome to my API!!!");
 })

//////////// USER /////////////////

function signJwt1(user_id) {
    const token = jwt.sign({sub: user_id}, process.env.SECRET);
    if (!token) return false;
    return token;
}

function verifyJwt1(req, res, next) {
    const authorization = req.header('authorization');
    const token = authorization ? authorization.split('Bearer ')[1] : undefined;
    if(!token) {
        return res.send(401, "Unauthorized");
    }
    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if (err || !payload.sub) {
            return res.send(401, "Unauthorized");
        }
        return next();
    })
}

userRouter.route("/login").post((req, res) => {
    UserModel.find({email: req.body.email}, function (error, users) { 
        if (error || users.length === 0) {
            return res.send(error);
        }
        if (req.body.password !== users[0].password) {
            return res.send("Wrong password")
        }
        const token = signJwt1(users[0]._id);
        return res.json({accessToken: token, user: users[0].email});
    })
});

userRouter.route('/register').post((req, res) => {
    //console.log(req.body.email + " " + req.body.password);
    UserModel.find({email: req.body.email}, function (error, users) { 
        if (error || users.length > 0) {
            console.log(users.length);
            return res.send(error);
        }
        let user = new UserModel({name: req.body.name, email: req.body.email, password: req.body.password});
        user.save();
        return res.json(user);
    })
});

userRouter.route('/logout').get((req, res) => {
    res.cookie('jwt', '', 1); // mozda 1 u {1}
});

app.use("/api", userRouter);

//////////// USER /////////////////

//////////// READ COMPANY /////////////////

craftProducts.get('/company/:name', (req, res) => {
    Company.find({name: req.params.name}, (err, name) => {
        if(err){
            res.send(err);
        }
        else{
            return res.json(name);
        }
    });
 });

craftProducts.route('/company').get((req, res) => {
    Company.find((err, products) => {
        if(err) {
            res.send(err);
        }
        else {
            return res.json(products);
        }
    });
})

craftProducts.route('/products').get((req, res) => {
    Company.find((err, products) => {
        if(err) {
            res.send(err);
        }
        else {
            //console.log(res.json(products) + "AAAAAAAAa");
            // const productObject = 
            //console.log(productObject.data);
            return res.json(products);
        }
    })
});

craftProducts.get('/products/:name', (req, res) => {
    Company.find({name: req.params.name}, (err, name) => {
        if(err){
            res.send(err);
        }
        else{
            return res.json(name);
        }
    });
 });

app.use("/api", craftProducts);

//////////// READ COMPANY /////////////////


//////////// CREATE COMPANY /////////////////

craftProducts.route('/company')
    .post((req, res)=>{
        const company = new Company(req.body);
        console.log(req.body)
        console.log(company)
        movie.save()
        return res.status(210).json(company)
    })
    // .get((req, res)=>{
    //     //const query = {genre:"Comedy"}
    //     Movie.find((err, movies)=>{
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             res.json(movies)
    //         }
    //     })
    // })

app.listen(port, ()=>{
    console.log("Running on port " + port);
})