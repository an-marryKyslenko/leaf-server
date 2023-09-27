import User from "../models/User";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";

const auth = (req, res, next) => {
	//check header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startWith('Bearer ')) {
		throw new UnauthenticatedError('Authentication invalid')
	}
	const token = authHeader.ssplit(' ')[1]
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)

		req.user = { userId: payload.userId, name: payload.name }
		next()
	} catch (error) {
		throw new UnauthenticatedError('Authentication invalid')
	}
}

export default auth;