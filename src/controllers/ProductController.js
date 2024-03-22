const ProductService = require('../services/ProductService')



const createProduct = async (req, res) => {
    try {
        const { name, image, description, rating, category, price, countInStock } = req.body
        if (!name || !image || !rating || !category || !price || !countInStock) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input in required'
            })
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productID in required'
            })
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getdetailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId in required'
            })
        }
        const response = await ProductService.getdetailProduct(productId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const token = req.headers
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId in required'
            })
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// const getAllProduct = async (req, res) => {
//     try {
//         const { limit, page , sort, filter } = req.query // phan trang o backend
//         const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter) //phan trang o backend
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

const getAllProduct = async (req, res) => {
    try {
        const { limit = 8, page = 0, sort, filter } = req.query; // Thiết lập giá trị mặc định cho limit và page

        // Kiểm tra tính hợp lệ của limit và page
        if (isNaN(parseInt(limit)) || isNaN(parseInt(page))) {
            return res.status(400).json({ message: "Invalid limit or page value" });
        }

        const response = await ProductService.getAllProduct(Number(limit), Number(page), sort, filter);
        if (!response || !response.data || response.data.length === 0) {
            return res.status(200).json({ status: 'OK', message: 'No products found', data: [], totalProducts: 0, pageCurrent: 1, totalPage: 0 });
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in getAllProduct:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = {
    createProduct,
    updateProduct,
    getdetailProduct,
    deleteProduct,
    getAllProduct

}