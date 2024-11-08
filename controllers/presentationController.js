const Presentation = require('../models/index').Presentation;

module.exports = {
    //GET all presentations
    async getPresentations(req, res) {
        try {
          const presentations = await Presentation.findAll();
          res.json(presentations);
        } catch (error) {
          console.log(error);
          res.json({ error: "Error en el controlador" });
        }
      },

    //GET presentation by id
    async getPresentation(req, res) {
        try {
            const { id } = req.params;
            const presentation = await Presentation.findOne({ where: { id } });
            res.json(presentation);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //CREATE presentation
    async createPresentation(req, res) {
        try {
            const { presentation_name } = req.body;

            const presentation = await Presentation.create({ presentation_name });
            res.json(presentation);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //UPDATE presentation
    async updatePresentation(req, res) {
        try {
            const { id } = req.params;
            const { presentation_name } = req.body;

            await Presentation.update({ presentation_name }, { where: { id } });
            res.json({
                message: 'Presentación actualizada'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

}
