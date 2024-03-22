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
                message: 'Product updated successfully',
                data: updatedProduct
            });

        } catch (error) {
            reject(error);
        }
    })
}

// const getAllProduct = (limit , page , sort, filter) => {  // phan trang o backend
//     return new Promise(async (resolve, reject) => {
//         try {
//             const totalProducts = await Product.countDocuments()  
//             const totalPages = Math.ceil(totalProducts / limit);  
//             if (filter) {
//                 const label = filter[0]
//                 const allOjectFilter = await Product.find({
//                     [label] : {'$regex' : filter[1]} 
//                 }).limit(limit).skip(page * limit)
//                 resolve({
//                     status: 'OK',
//                     message: 'SUCCESS',
//                     data: allOjectFilter,
//                     totalProducts: totalProducts,  
//                     pageCurrent: page + 1,  
//                     totalPage: totalPages  
//                 });
//             }
//             if(sort){
//                 const objectSort = {}
//                 objectSort[sort[1]] = sort[0]
//                 const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
//                 resolve({
//                     status: 'OK',
//                     message: 'SUCCESS',
//                     data: allProductSort,
//                     totalProducts: totalProducts,  
//                     pageCurrent: page + 1,  
//                     totalPage: totalPages  
//                 });
//             }
//             const allProduct = await Product.find().limit(limit).skip(page * limit)
//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 data: allProduct,
//                 totalProducts: totalProducts,  // phan trang o backend
//                 pageCurrent: page + 1,  // phan trang o backend
//                 totalPage: totalPages  // phan trang o backend
//             });

//         } catch (error) {
//             reject(error);
//         }
//     })
// }

const getAllProduct = (limit, page, sort, filter) => { // phan trang o backend
    return new Promise(async (resolve, reject) => {
        try {
            let query = Product.find(); // Bắt đầu với truy vấn không lọc

            // Điều kiện lọc (nếu có)
            if (filter) {
                const label = filter[0];
                const regex = new RegExp(filter[1], 'i'); // Tạo biểu thức chính quy không phân biệt chữ hoa chữ thường
                query = query.where(label).regex(regex);
            }

            // Điều kiện sắp xếp (nếu có)
            if (sort) {
                const [sortBy, sortOrder] = sort;
                query = query.sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 }); // Sử dụng sortOrder để xác định chiều sắp xếp
            }

            // Số lượng sản phẩm (limit) và trang (page)
            query = query.limit(limit).skip(page * limit);

            // Thực hiện truy vấn để lấy danh sách sản phẩm
            const products = await query;

            // Tính tổng số trang dựa trên tổng số sản phẩm và số lượng sản phẩm trên mỗi trang
            const totalProducts = await Product.countDocuments();
            const totalPages = Math.ceil(totalProducts / limit);

            // Trả về kết quả thành công
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: products,
                totalProducts: totalProducts, // Tổng số sản phẩm
                pageCurrent: page + 1, // Trang hiện tại
                totalPage: totalPages // Tổng số trang
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            reject(error);
        }
    });
};


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