import mongoose from "mongoose";

const productSchma = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'product price must be provided']
	},
	price: {
		type: Number,
		required: [true, 'product price must be provided']
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
	quantity: {
		type: Number,
		default: 1,
	},
	image: {
		type: String,
		required: [true, 'product image must be provided']
	},
	company: {
		type: String,
		required: [true, 'product company must be provided']

	},
	type: {
		type: String,
		required: [true, 'product type must be provided']
	},
	category: {
		type: String,
		enum: ['seeds', 'help the agronomist', 'feed group', 'plants protecting tools', 'fertilizers']
	},
	culture: [String]
})

export default mongoose.models.products || mongoose.model("Product", productSchma)