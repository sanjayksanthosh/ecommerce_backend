const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const Category = require('../models/category')
const mongoos = require('mongoose')

router.get(`/`, async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ success: false })
    }

    res.send(productList);
})

//only names 

router.get(`/names`, async (req, res) => {
    const productList = await Product.find().select('name');

    if (!productList) {
        res.status(500).json({ success: false })
    }

    res.send(productList);
})
router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments((count) => count);

    if (!productCount) {
        res.status(500).json({ success: false })
    }

    res.send({
        productCount: productCount
    });
})

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        res.status(500).json({ success: false })
    }

    res.send(product);
})


router.post(`/`, async (req, res) => {
    let category = await Category.findById(req.body.category);
    if (!category)
        return res.status(404).send('Invalid Category');



    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,


    })
    product = await product.save();

    if (!product)
        return res.status(500).send('Product cannot be created')

    res.send(product);


})

router.put(`/:id`, async (req, res) => {
    if (!mongoos.isValidObjectId(req.params.id)) {
        res.status(404).send('Invalid Product id');
    }
    let category = await Category.findById(req.body.category);
    if (!category)
        return res.status(404).send('Invalid Category');

    const product = await Product.findByIdAndUpdate(
        req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    }, {
        new: true
    }
    )
    if (!product)
        return res.status(404).send('the product cannot be updated !')

    res.send(product);
})


router.delete(`/:id`, (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({
                success: true, message: 'the product is deleted !'
            })
        } else {
            return res.status(404).json({
                success: false, message: 'product not found'
            })
        }
    }).catch(err => {
        return res.status(400).json({
            success: false, error: err
        })
    })
})



module.exports = router;