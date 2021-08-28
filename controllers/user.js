const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModal = require("../models/user.js");
const secret = 'test';

const signin_signup = async (req, res) => {
  try {
    if (req.body.action == 'signin') {
        const username = req.body.username;
        const password = req.body.password;
        const oldUser = await UserModal.findOne({ name: username });
        if (!oldUser) return res.render('auth.ejs', { data1: "User doesn't exist", msg_type1: "err_msg" });
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.render('auth.ejs', { data1: "Invalid credentials", msg_type1: "err_msg" });
        res.redirect("/Game");
    }
    
    else {
        const { username, email, password, r_password } = req.body;
        const oldUser = await UserModal.findOne({ name: username });
        if (oldUser) return res.render('auth.ejs', { data: "User already exists !", mode: "sign-up-mode", msg_type: "err_msg" })
        if (password == r_password) {
          const hashedPassword = await bcrypt.hash(password, 12);
          const result = await UserModal.create({ name: username, email: email, password: hashedPassword });
          res.render('auth.ejs', { data: "Signup Successful.", mode: "sign-up-mode", msg_type: "success_msg" })
        } else {
          res.render('auth.ejs', { data: "Password and repeat password do not match !", mode: "sign-up-mode", msg_type: "err_msg" })
        }
    }
  }
  catch (err) {
    throw err;
  }
};

module.exports = signin_signup;