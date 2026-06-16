const express = require("express")
let router = express.Router();

const { register, login } = require("../controllers/auth_controller");

router.post('/register', register)
router.post('/login', login)

module.exports = router;