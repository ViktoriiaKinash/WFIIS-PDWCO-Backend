const express = require('express');
const cors = require('cors');

var corsOptions = {
    origin: "*"
};
const app = express(); 

app.use(cors(corsOptions));

app.use(express.json());

require('./routes/routes.js')(app)

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Projekt Baza Danych Ligi NBA</title>
            </head>
            <body>
                <h1>Projekt koszystający z Neo4j AuraDB</h1>
            </body>
        </html>
    `);
});

const port = 3000;

app.listen(port, () => {
    console.log('Server running on http://localhost:', port);
});