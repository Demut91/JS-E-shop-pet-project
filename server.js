const express = require ('express');
const app = express ();

const fs = require ('fs');



var cors = require ('cors');
app.use (cors ());


app.listen (3000, () => {
  console.log ('server is running on port 3000!');
});

app.use (express.static ('.'));

app.get ('/catalogData', (req, res) => {
  fs.readFile ('./database/catalog.json', 'utf8', (err, data) => {
    res.send (data);
  });
});

app.post ('/addToCart', (req, res) => {
  fs.readFile ('cart.json', 'utf8', (err, data) => {
    const cart = JSON.parse (data);
    const item = req.body;
    cart.push (item);
    fs.writeFile ('cart.json', JSON.stringify (cart), err => {
      console.log ('done');
    });
  });
});

const bodyParser = require ('body-parser');
app.use (bodyParser.json ());
