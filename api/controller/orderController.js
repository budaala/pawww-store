import Order from "../model/orderModel.js"
import Product from "../model/productModel.js"
import Stripe from "stripe";

import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2022-11-15",
});

export const order = async (req, res) => {
    try {
        const {
            items = [],
            totalPrice = 0
        } = req.body || {};

        if (!items || !totalPrice) {
            return res.status(400).json({ error: 'Brakuje danych w zamówieniu' });
        }

        const newOrder = new Order({
            items,
            totalPrice
        });

        await newOrder.save();
        console.log(newOrder)
        for (const item of newOrder.items) {
            const product = await Product.findById(item._id);
            console.log(product)
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ error: `Produkt "${item.name}" jest niedostępny w żądanej ilości.` });
            }
            product.stock = Math.max(Number(product.stock) - Number(item.quantity), 0);
            await product.save();
        }
        console.log(newOrder)
        console.log(newOrder.items)
        console.log("----")
        const sessionId = await payment(newOrder.items);
        res.status(201).json({ message: 'Zamówienie przyjęte', orderId: newOrder._id, id: sessionId });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." })
    }
}

const payment = async (products) => {

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "pln",
            product_data: {
                name: product.name
            },
            unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/order-successful",
        cancel_url: "http://localhost:5173/order-cancelled"
    })

    return session.id;
}

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (orders.length === 0) {
            return res.status(404).json({ message: "Orders not found." })
        }
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error." })
    }
}