const bookTypeService = require('../services/bookType.service');
const ApiError = require('../api-error');

async function getTypes(req, res, next){
    try {
        const services = bookTypeService();
        const types = await services.getAllTypes();
        return res.json(types);
        // return types;
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving all types')
        );
    }
}

    // define function to get type by book id
async function getTypeById(req, res, next) {
    try {
        const services = bookTypeService();
        const type = await services.getTypeById(req.params.id); // Use 'await' here
        console.log(type);
        if (type) {
            return res.json(type);
        } else {
            return next(
                new ApiError(404, 'Type not found')
            );
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving type')
        );
    }
}

module.exports = {
    getTypes,
    getTypeById
}