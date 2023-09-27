import mongoose from "mongoose"

const connectDB = (url) => {
	return mongoose.connect(url, {
		useNewUrlParser: true
	})
}

export default connectDB