const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let users = require('../models/user_model');
let mail = require('../utils/gmail');
let secretkey = process.env.JWT_SECRET_KEY;



exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !password || !email || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        // check if user already exists.
        let check_user = await users.findOne({ username })
        if (check_user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        // hashing the password.
        let hash_password = await bcrypt.hash(password, 10); // bcrypt.hash(data_to_hash, no.of_salt_rounds)
        await users.create({ username, email, password: hash_password, role });
        // generate json web token
        // payload, secretkey, expirydate             -->     .sign
        let payload = { username: username, emailaddress: email, role: role }
        let token = jwt.sign(payload, secretkey, { expiresIn: "1d" })
        res.status(201).json({ msg: "user is registered successfully", token });
        await mail(email, username);
    }
    catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ msg: "missing fields" })
        }

        let check_user = await users.findOne({ username });
        if (!check_user) {
            return res.status(401).json({ msg: "User not found!" })
        }

        let verify_password = await bcrypt.compare(password, check_user.password)
        if (!verify_password) {
            return res.status(403).json({ msg: "Invalid credentials" })
        }

        // verify the token
        // let token = req.header.authorization.split(' ')[1];

        let authHeader = req.headers && req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ msg: "Authorization header missing" });
        }
        let token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: "Token missing from Authorization header" });
        }

        let verify_token = await jwt.verify(token, secretkey);

        if (!verify_token) {
            return res.status(401).json({ msg: "token is invalid" })
        }

        res.status(200).json({ msg: "user logged in successfully" });
    }
    catch (error) {
        // console.log(error.message);
        // res.json({ msg: error.message });
        next(error)
    }
}