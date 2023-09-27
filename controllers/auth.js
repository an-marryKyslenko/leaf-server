import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from '../errors/bad-request.js';
import UnauthenticatedError from '../errors/unauthenticated.js'
import NotFoundError from "../errors/not-found.js";

const register = async (req, res) => {
	const user = await User.create({ ...req.body })
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({
		user, token
	})

}

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Please provide email and password')
	}

	const user = await User.findOne({ email })
	//compare password
	if (!user) {
		throw new UnauthenticatedError('Invalid Credentials')
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials')
	}
	const token = user.createJWT();
	res.status(StatusCodes.OK).json({
		user, token
	})
}
const updateUser = async (req, res) => {
	const {
		body: { email, name, password },
		params: {userId:id }
	} = req
	if (email === '' || password === '' && name === '') {
		throw new BadRequestError('Email or Name or Password cannot be empty!')
	}
	const user = await User.findByIdAndUpdate(
		{ _id: id },
		req.body,
		{ new: true, runValidators: true }
	)
	if (!user) {
		throw new NotFoundError(`No user with id ${id}`)
	}
	res.status(StatusCodes.OK).json({ user })
}
const deleteUser = async (req,res)=>{
	const {userId} = req.params

	const user = await User.findByIdAndRemove({
		_id: userId
	})

	if(!user){
		throw new NotFoundError(`No job with id ${jobId}`)
	}
	res.status(StatusCodes.OK).send("User was deleted")

}

export { register, login, updateUser,deleteUser}