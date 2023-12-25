import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';
import ProductRouter from './routers/products.js';
import AuthRouter from './routers/auth.js';
import errorHandlerMiddleware from './middeleware/error-handler.js';
import notFound from './middeleware/notFound.js';

import connectDB from './db/connect.js'

const port = process.env.PORT || 5000;


	const app = express()

	app.set('trust proxy', 1);
	app.use(
		rateLimiter({
			windowMs: 15 * 60 * 100, //15 minutes
			max: 100, //limit each IP to 100 per windowMs
		})
	);

	//extra packages
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json());
	app.use(helmet());
	app.use(cors());
	app.use(xss());

	app.get('/', (req, res) => {
		res.send("<h1>Store Api</h1><a href='/api/v1/products'>products</a>")
	})
	app.use(express.static("pablic"))
	app.use("/api/v1/products", ProductRouter)
	app.use("/api/v1/auth", AuthRouter)

	app.use(notFound)
	app.use(errorHandlerMiddleware)

export const start = async () => {
	try {
		await connectDB(process.env.MONGO_DB)
		app.listen(port, () => console.log(
			`Server is listening on port ${port}`
		))
	} catch (error) {
		console.log(error);
	}
}
export default app
start()
