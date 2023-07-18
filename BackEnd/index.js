const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json('tesk ok');
});

app.listen(4000);