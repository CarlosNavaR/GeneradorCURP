//^.*?([A-ZÑ])(?:.*?([^AEIOU]))(?:.*?([AEIOU]))
const ejsLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// Public resource
app.use(express.static("public"));

// use body parser
app.use(express.urlencoded({
    extended: true
}));

// View motor EJS
app.set("view engine", "ejs");
app.use(ejsLayouts);

// Route module load
const router = require("./routes/router");

// Route module use
app.use("/", router);

app.listen(port, () => {
    console.log("Server on: port 8080");
});