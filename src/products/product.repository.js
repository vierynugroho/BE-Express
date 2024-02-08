// TODO: Services
// Komunikasi Database
// --------------------------------------

const prisma = require('../database/index');

const findProducts = async () => {
	const products = await prisma.products.findMany();
	return products;
};

const findUniqueProduct = async (id) => {
	const product = await prisma.products.findUnique({
		where: {
			id,
		},
	});
	return product;
};

const updateProduct = async (id, data) => {
	const product = await prisma.products.update({
		where: {
			id,
		},
		data: {
			name: data.name,
			price: data.price,
			description: data.description,
			image: data.image,
		},
	});

	return product;
};

const deleteProductById = async (id) => {
	await prisma.products.delete({
		where: {
			id,
		},
	});
};

const insertProduct = async (data) => {
	const product = await prisma.products.create({
		data: {
			name: data.name,
			price: data.price,
			description: data.description,
			image: data.image,
		},
	});

	return product;
};

module.exports = {
	findProducts,
	findUniqueProduct,
	updateProduct,
	deleteProductById,
	insertProduct,
};
