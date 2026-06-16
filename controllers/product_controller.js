let products = require('../models/product_model');

exports.get_products = async (req, res) => {
    try {
        let all_products = await products.find();
        res.status(200).json(all_products);
    }
    catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
}

exports.create_product = async (req, res) => {
    try {
        await products.create(req.body);
        res.status(201).json({ msg: "Product is Posted Successfully" });
    }
    catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
}

exports.create_bulk = async (req, res) => {
    try {
        await products.insertMany(req.body);
        res.status(201).json({ msg: "Products are Posted Successfully" });
    }
    catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
}

exports.update_product = async (req, res) => {
    try {
        await products.findByIdAndUpdate(req.params.id, req.body);
        res.status(203).json({ msg: "Products Updated Syccessfully" });
    }
    catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
}

exports.delete_product = async (req, res) => {
    try {
        await products.findByIdAndDelete(req.params.id, req.body);
        res.status(204).json({ msg: "Products Deleted Successfully" })
    }
    catch (error) {
        console.log(error.message);
        res.json({ msg: error.message });
    }
}

