import express from 'express'
import { getAllProducts, createProduct, getSingleProduct } from '../controllers/products.js'


const router = express.Router()

router.get('/', getAllProducts)
// router.get('/:id',getSingleProduct)
router.post('/', createProduct)

export default router