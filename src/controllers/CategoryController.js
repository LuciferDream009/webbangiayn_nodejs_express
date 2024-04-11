const CategoryService = require('../services/CategoryService')



const createCategory = async (req, res) => {
    try {
        const { name,description} = req.body
        if (!name || !description ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input in required'
            })
        }
        const response = await CategoryService.createCategory(req.body);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const data = req.body
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The categoryId in required'
            })
        }
        const response = await CategoryService.updateCategory(categoryId, data);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const token = req.headers
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The categoryId in required'
            })
        }
        const response = await CategoryService.deleteCategory(categoryId);
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

// const getAllCategory = async (req, res) => {
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


module.exports = {
    createCategory,
    updateCategory,
     deleteCategory
    // getAllCategory

}