// TODO: Controller
// Layer handle request & response
// handle validasi body
// --------------------------------------

const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct, editProduct, deleteProduct } = require('./products.service');

router.get('/', async (req, res) => {
	const products = await getAllProducts();
	res.send(products);
});

router.get('/:id', async (req, res) => {
	try {
		const productId = parseInt(req.params.id);

		if (typeof productId !== 'number') {
			throw Error('ID is not a number!');
		}

		const product = await getProductById(productId);

		if (!product) {
			res.status(400).json({ status: false, message: 'Product Not Found' });
		} else {
			res.status(200).json({ status: true, message: 'Product Found', data: product });
		}
	} catch (error) {
		res.status(400).json({ status: false, message: `${error}` });
	}
});

router.post('/', async (req, res) => {
	try {
		const newProductData = req.body;
		const product = await addProduct(newProductData);

		if (!(newProductData.name && newProductData.image && newProductData.description && newProductData.price)) {
			throw Error('Some Field are Missing');
		}

		res.status(201).send({
			data: product,
			message: 'create product success!',
		});
	} catch (error) {
		res.status(500).send('Internal Server Error');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const productId = parseInt(req.params.id); // default: string

		if (typeof productId !== 'number') {
			throw Error('ID is not a number!');
		}

		await deleteProduct(productId);

		res.send('Product Deleted!');
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// put: menggantikan seluruh data dengan data baru.
// patch: menggantikan sebagian data dengan data baru.
router.put('/:id', async (req, res) => {
	try {
		const productId = parseInt(req.params.id);
		const newestProductData = req.body;

		if (typeof productId !== 'number') {
			throw Error('ID is not a number!');
		}

		if (!(newestProductData.name && newestProductData.image && newestProductData.description && newestProductData.price)) {
			return res.status(400).send('Some Field are Missing');
		}

		const product = await editProduct(productId, newestProductData);

		res.status(200).json({ status: true, message: 'Produk berhasil diperbarui', data: product });
	} catch (error) {
		res.status(400).json({ status: false, message: 'Terjadi kesalahan saat memperbarui produk' });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const productId = parseInt(req.params.id);
		const newestProductData = req.body;
		const product = await editProduct(productId, newestProductData);

		res.status(200).json({ status: true, message: 'Produk berhasil diperbarui', data: product });
	} catch (error) {
		res.status(400).json({ status: false, message: 'Terjadi kesalahan saat memperbarui produk' });
	}
});

module.exports = router;
