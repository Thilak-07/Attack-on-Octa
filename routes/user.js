const express = require('express');
const router = express.Router();

const signin_signup = require("../controllers/user.js");

router.get('/', function(req,res){res.redirect("/Auth")})
router.get('/Auth', function(req,res){res.render('auth.ejs')})
router.post("/Auth", signin_signup);
router.get("/Game", function(req,res){res.render('index.ejs')})

module.exports = router;