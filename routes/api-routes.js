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
        db.project.findOne({
            where: {
                id: req.params.id
            }
        }).then( function(results){
            res.json(results)
        })
    });

    //Route to add new porject
    app.post("/addporject/", function(req, res){
        console.log(req.body)
        // db.project.create(req.body).then( function(project){
        //     res.json(project);
        // })
    });

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });
}