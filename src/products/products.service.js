// TODO: Services
// Handle business logic
// Reusable
// --------------------------------------

const { findProducts, findUniqueProduct, updateProduct, deleteProductById, insertProduct } = require('./product.repository');

const getAllProducts = async () => {
	const products = await findProducts();
	return products;
};

const getProductById = async (id) => {
	if (typeof id !== 'number') {
		throw Error('ID is not a number!');
	}

	const product = await findUniqueProduct(id);

	if (!product) {
		throw Error('Product not found');
	}

	return product;
};

const addProduct = async (data) => {
	const product = await insertProduct(data);

	return product;
};

const editProduct = async (id, data) => {
	await getProductById(id);
	const product = await updateProduct(id, data);

	return product;
};

const deleteProduct = async (id) => {
	await getProductById(id);

	await deleteProductById(id);
};

module.exports = {
	getAllProducts,
	getProductById,
	addProduct,
	editProduct,
	deleteProduct,
};
