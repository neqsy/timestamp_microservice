// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice endpoint
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // Jeśli nie podano daty, użyj bieżącej daty
  if (!dateString) {
    date = new Date();
  } else {
    // Jeśli parametr składa się wyłącznie z cyfr, traktuj go jako timestamp
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Jeśli data jest nieprawidłowa, zwróć błąd
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    // Zwróć wynik: Unix timestamp (w ms) oraz datę w formacie UTC
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
