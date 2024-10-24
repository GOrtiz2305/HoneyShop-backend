const brandModels = require('../models/brandModel');

module.exports = {
    //GETS all brands
    async getBrands(req, res) {
        try {
            const brands = await brandModels.findAll();
            res.json(brands);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    //GET brand by id
    async getBrand(req, res) {
        try {
            const { id } = req.params;
            const brand = await brandModels.findByPk(id);
            res.json(brand);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },
    
    //CREATE brand
    async createBrand(req, res) {
        try {
            const { brand_name } = req.body;
            const brand = await brandModels.create({ brand_name });
            res.json(brand);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //UPDATE brand
    async updateBrand(req, res) {
        try {
            const { id } = req.params;
            const { brand_name } = req.body;
            await Brand.update({ brand_name }, { where: { id } });
            res.json({
                message: 'Marca actualizada'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //DELETE brand
    async deleteBrand(req, res) {
        try {
            const { id } = req.params;
            await Brand.destroy({ where: { id } });
            res.json({
                message: 'Marca eliminada'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    }
}