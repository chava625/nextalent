const express = require("express");
const mongo = require("./db/mongo");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const users = require("./routes/users");
const subsR = require("./routes/subs");
const favoritesR = require("./routes/favorites");
const createError = require('http-errors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//test
app.use("/api/users", users);
app.use("/api/subs", subsR);
app.use("/api/favorites", favoritesR);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// handle erros
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
app.listen(process.env.PORT || 4000,() =>{
  console.log("Express server listening on port 4000",app.settings.env);
});

