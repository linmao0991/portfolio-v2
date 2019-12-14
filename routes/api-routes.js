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
    
}