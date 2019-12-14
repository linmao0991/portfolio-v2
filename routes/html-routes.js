// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

//Requiring middleware for checking if a user is logged in.
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.
  
    // index route loads home.html
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // profile route loads profile.html
    app.get("/profile", isAuthenticated, function(req, res) {
      res.sendFile(path.join(__dirname, "../public/cp.html"));
    });
  };