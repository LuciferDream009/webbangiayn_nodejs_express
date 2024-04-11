const Category = require('../models/Category')

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { name, description} = newCategory
        try {
            const checkCategory = await Category.findOne({
                name: name
            })
            if (checkCategory !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of category is already'
                })
            }
            const newCategory = await Category.create({
                name, description
            })
            if (newCategory) {
                resolve({
                    status: 'OK',
                    message: 'SUCCSESS',
                    data: newCategory
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            })
            console.log('checkCategory', checkCategory)

            if (checkCategory === null) {
                resolve({
                    status: 'OK',
                    message: 'the Category is not defined'
                })
            }
            const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true })
            console.log('updatedCategory', updatedCategory);
            resolve({
                status: 'OK',
                message: 'Category updated successfully',
                data: updatedCategory
            });

        } catch (error) {
            reject(error);
        }
    })
}

const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            })

            if (checkCategory === null) {
                resolve({
                    status: 'OK',
                    message: 'the user is not defined'
                })
            }
            await Category.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete Category success'
            });

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}