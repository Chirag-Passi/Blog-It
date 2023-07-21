const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// USED FOR ENCRYPTING THE PASSWORD FOR USER
const salt = bcrypt.genSaltSync(10);

// SECRET KEY FOR COOKIE
const secret = 'jfajfajfkalfj75nna92h28';

// USED FOR MAKIG REQUEST FROM ONE SIDE TO OTHER , LIKE FROM CLIENT - SERVER AND VICE VERSA
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

// USED TO ACCES COOKIES , THAT WE GOT FROM SERVER
app.use(cookieParser());

// MONGO DB CONNECTION
mongoose.connect('mongodb+srv://blog:blog@cluster0.cwf9ud0.mongodb.net/?retryWrites=true&w=majority');


// USER REGISTERATION
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc);
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});


// USER LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // -- logged in ---
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });
    }
    else {
        res.status(400).json('wrong credentials');
    }
});


// GETTING USER INFO TO CHECK IF USER IS SIGN IN OR NOT USING COOKIE 
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
    res.json(req.cookies);
});


//  LOGOUT FUNCTIONALITY
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});


app.listen(4000);