const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const productController = require('../controllers/products');

router.get('/' + '', auth, productController.listAllProducts);
router.post('/', auth, multer, productController.createProduct);
router.get('/:id', auth, productController.readProduct);
router.put('/:id', auth, multer, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;