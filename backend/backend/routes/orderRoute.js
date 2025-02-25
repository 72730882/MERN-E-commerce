import express from 'express'

import { placeOrder,allOrders,userOrders,updateStatus  } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()
//Admin Features
orderRouter.post('/list',allOrders)
orderRouter.post('/status',updateStatus )

//Payment features
orderRouter.post('/place',authUser,placeOrder)

//User Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;