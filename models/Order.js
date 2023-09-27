import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
	list: {
		type: [String],
		required: [true, 'Please add some product to order']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	status: {
		type: String,
		enum: ['pending', 'completed', 'dispatch'],
		default: 'completed'
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, "Please provide user"]
	}
})

export default mongoose.model("Order", OrderSchema)