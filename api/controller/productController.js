import Product from "../model/productModel.js"

// export const create = async (req, res) => {
//     try {
//         const productData = new Product(req.body);
//         const {id} = productData;
//     }
//     catch (error) {
//         res.status(500).json({ error: "Internal server error." })
//     }
// }

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: "Product not found." })
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error." })
    }
}