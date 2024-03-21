const Product = require('../models/Product')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, description, rating, category, price, countInStock } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }
            const newProduct = await Product.create({
                name, image, description, rating, category, price, countInStock
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCSESS',
                    data: newProduct
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            console.log('checkProduct', checkProduct)

            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'the product is not defined'
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            console.log('updatedProduct', updatedProduct);
            resolve({
                status: 'OK',
                message: 'User updated successfully',
                data: updatedProduct
            });

        } catch (error) {
            reject(error);
        }
    })
}

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct
            });

        } catch (error) {
            reject(error);
        }
    })
}

const getdetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'the product is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            });

        } catch (error) {
            reject(error);
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'the user is not defined'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product successfully'
            });

        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getdetailProduct,
    deleteProduct

}