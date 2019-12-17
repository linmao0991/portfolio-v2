// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
require('dotenv').config();
var db = require("../models");
var passport = require("../config/passport");
var path = require('path');
var fs = require('fs');
var aws = require('aws-sdk');
aws.config.region = "us-east-2";
var Bucket_Name = process.env.S3_BUCKET;
var User_Key = process.env.AWS_ACCESS_KEY;
var Secret_Key = process.env.AWS_SECRET_ACCESS_KEY;
var isAuthenticated = require("../config/middleware/isAuthenticated");
//-------------------------------------------------------------------

// Routes
// =============================================================
module.exports = function (app) {

    //Route to get all projects
    app.get("/getporjects/all", function(req,res){
        db.project.findAll({}).then(function(results){
            res.json(results);
        });
    });

    //Route to get project by id
    app.get("/getporjects/byid/:id", function(req,res){
        db.project.findAll({
            where: {
                accountId: req.params.id
            }
        }).then( function(results){
            res.json(results)
        })
    });

    app.post("/deleteproject/byid/:id",isAuthenticated, function(req, res){
        db.project.destory({
            where: {
                id: req.params.id,
                accountId: req.user.id
            }
        })
    })

    app.get("/api/user_data", function(req, res){
        if(!req.user){
            res.json({
                user_id: "none",
                user_name: "none",
                logged_in: false
            })
        }else{
            res.json({
                user_id: req.user.id,
                user_name: req.user.user_name,
                logged_in: true
            })
        }
    })

    //Route to add new porject
    app.post("/addporject/", isAuthenticated,function(req, res){
        req.body.user_name = req.user.user_name;
        req.body.accountId = req.user.id;
        console.log(req.body);
        db.project.create(req.body).then( function(project){
            res.redirect("/profile");
        })
    });

    //Route for login
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.redirect("/profile")
    });

    //Route for Sign up
    app.post("/api/signup", function (req, res) {
        db.account.create({
            user_name: req.body.user_name,
            password: req.body.password,
          })
          .then(function () {
            res.redirect("/");
          })
          .catch(function (err) {
            res.status(401).json(err);
          });
      });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
}