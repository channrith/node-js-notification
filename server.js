const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    app.get('/', (req, res) => {
        res.send('Hello world!');
    });
});

console.log(`server is running on port ${port}`);
