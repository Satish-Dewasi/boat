import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import ApiError from "../util/apiErrors.js"
import { asyncHandler } from "../util/asyncHandler.js"

// Create new order => /api/v1/order/new

export const newOrder = asyncHandler(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
      } = req.body;

      const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user: req.user.id
      })

      res.status(200).json({
        success : true,
        message: "Order created successfully",
        order
      })
});

// Get single order details => /api/v1/orders/:id
export const getOrderDetails = asyncHandler(async (req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ApiError("No order found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        message: "Order details fatched successfully",
        order
    })    

});


// Get current user's orders => /api/v1/me/orders
export const myOrders = asyncHandler(async (req, res, next)=>{
    const orders = await Order.find({user: req.user.id}).populate("user", "name email");

    res.status(200).json({
        success: true,
        message: "Orders fatched successfully",
        order_count : orders.length,
        orders
    })    

});

// Get all orders ADMIN => /api/v1/admin/orders
export const allOrders = asyncHandler(async (req, res, next)=>{
    const orders = await Order.find();

    res.status(200).json({
        success: true,
        message: "Orders fatched successfully",
        order_count : orders.length,
        orders
    })    

});

// update orders ADMIN => /api/v1/admin/orders/:Id
export const updateOrder = asyncHandler(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ApiError("Order not found with this ID", 404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ApiError("You have already delivered this orders",400))
    }

    // update product stock
    order.orderItems?.forEach(async (item)=>{

        const product= await Product.findById(item?.product?.toString());

        if(!product){
            return  new ApiError("No product found with this ID", 404);
        }

        product.stock = product.stock- item.quantity;
        await product.save({validateBeforeSave: false});

    });

    // update order status
    order.orderStatus = req.body.status;
    if(order.orderStatus === "Delivered"){
        order.deliveredAt= Date.now();
    }
    
    await order.save();
    
    res.status(200).json({
        success: true,
        message: "Orders status updated",
        order
    })    

});

// Delete orders ADMIN => /api/v1/admin/orders/:id
export const deleteOrders = asyncHandler(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ApiError("No order found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: "Order deleted"
    })    

});