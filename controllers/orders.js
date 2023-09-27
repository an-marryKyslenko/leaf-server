import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";

const getAllOrders = async (req,res)=>{
	const orders = await Order
	.find({createdBy: req.user.userId})
	.sord('createdAt')

	res.status(StatusCodes.OK).json({orders})
}

const createOrder = async (req,res)=>{
	req.body.createdBy = req.user.userId
	const order = await Order.create(req.body)
	res.status(StatusCodes.CREATED).json({order})
}

export {getAllOrders,createOrder}