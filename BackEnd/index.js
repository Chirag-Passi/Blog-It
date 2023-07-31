const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'upload/' });
const fs = require('fs');
const connectDb = require("./config/db")

// USED FOR ENCRYPTING THE PASSWORD FOR USER
const salt = bcrypt.genSaltSync(10);

// SECRET KEY FOR COOKIE
const secret = 'bhjbdjwj3b34b43bhj42jjsjjhbjdcjwa';

// USED FOR MAKIG REQUEST FROM ONE SIDE TO OTHER , LIKE FROM CLIENT - SERVER AND VICE VERSA
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

// USED TO ACCES COOKIES , THAT WE GOT FROM SERVER
app.use(cookieParser());

app.use('/upload', express.static(__dirname + '/upload'));

// MONGO DB Connection 
connectDb();

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
    console.log(username);
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // -- logged in ---
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    }
    else {
        res.status(400).json('wrong credentials');
    }
});
// app.post('/register', async (req, res) => {
//     // console.log(req.body);
//     const { username, password } = req.body;
//     try {
//         // to handle unique users registration, use try-catch
//         const userDoc = await User.create({
//             username,
//             password: bcrypt.hashSync(password, salt),
//         });
//         res.json(userDoc);
//         console.log(userDoc);
//     } catch (error) {
//         res.status(400).json(error);
//     }

// })



// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const userDoc = await User.findOne({ username: username })
//     //now to verify the password user is inserting, we need to compare the password that is encrypted by bcrypt and stored in our db(userDoc.password) with the password user is inserting(password)
//     const passOk = bcrypt.compareSync(password, userDoc.password); // true-if pass matches else false
//     if (passOk) {
//         //logged in
//         jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
//             if (err) throw err;
//             //saving jwt created of user as cookie
//             res.cookie('token', token).json({
//                 id: userDoc._id,
//                 username,
//             });
//             //token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByaXR1IiwiaWQiOiI2NDExYmZhNGZmY2ExNmE1NDQ5NzBjZWQiLCJpYXQiOjE2Nzg4ODgyMDV9.cv4ENQqQPkVCfKVY4P4lbIEmzqZ0q51aemAYakbk_yw; 
//         });

//     } else {
//         res.status(404).json('wrong credentials');
//     }

// })

// GETTING USER INFO TO CHECK IF USER IS SIGN IN OR NOT USING COOKIE 
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
    // res.json(req.cookies);
});


//  LOGOUT FUNCTIONALITY
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});


// POSTING NEW THREAD & SENDING IT TO DATABASE
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    console.log("dkkdk")
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
});



// Displaying All post from the Database in Home / Dashboard
app.get('/post', async (req, res) => {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20); //sorting the post in descending order, so latest post shows at the top //limit : Specifies the maximum number of documents the query will return
    res.json(posts);
})

// Expanding Single Page Post
app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.listen(4000);