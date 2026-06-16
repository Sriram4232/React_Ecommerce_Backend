const express = require("express")
let router = express.Router();

const { get_products, create_product, create_bulk, update_product, delete_product } = require("../controllers/product_controller");

router.get('/', get_products)
router.post('/', create_product)
router.post('/bulk', create_bulk)
router.put('/:id', update_product)
router.delete('/:id', delete_product)

module.exports = router;