import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
	const { company, name, price, sort, category, type } = req.query
	const queryObject = {};

	if (name) {
		queryObject.name = { $regex: name, $options: 'i' }
	}
	if (company) {
		queryObject.company = company
	}
	if (category) {
		queryObject.category = category
	}
	if (type) {
		queryObject.type = type
	}
	if (price) {
		const obj = {}
		const priceOptions = price.split(',').map(item => {
			const [key, value] = item.split('=')
			obj[key] = Number(value)
		})
		queryObject.price = obj
	}
	//page,limit,sort
	// const page = Number(req.query.page) || 1;
	// const limit = Number(req.query.limit) || 12;
	// const skip = (page - 1) * limit;

	const sortList = sort || 'createAt';

	const result = Product
		.find(queryObject)
		.sort(sortList);

	const products = await result

	res.status(200).json({ nbHit: products.length, products })
}
const getSingleProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById({_id: id}).exec()
		res.status(200).json(product )
	} catch (error) {
		console.log(error);
	}
}

const createProduct = async (req, res) => {
	const { name, price, type, company, category, culture, quantity, image } = req.body
	try {

		const product = await Product.create({
			name, price, type, company, image, category, culture, quantity
		})
		product.save()
		return res.status(200).json("Product saved")
	} catch (error) {
		console.log(error.message);
	}
}
export { getAllProducts, createProduct, getSingleProduct }