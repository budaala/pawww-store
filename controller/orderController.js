import Order from "../model/orderModel.js"
import Product from "../model/productModel.js"

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

        console.log(newOrder);

        await newOrder.save();
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ error: `Produkt "${item.name}" jest niedostępny w żądanej ilości.` });
            }
            product.stock = Math.max(Number(product.stock) - Number(item.quantity), 0);
            await product.save();
        }
        res.status(201).json({ message: 'Zamówienie przyjęte', orderId: newOrder._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." })
    }
}