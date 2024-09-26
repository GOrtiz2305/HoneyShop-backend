const user = process.env.API_USER;
const password = process.env.API_PASSWORD;
const axios = require('axios');

module.exports = {
    //Find card
    async allCards(req, res) {
        try {
            const cards = await axios.get('https://sandbox-api.marqeta.com/v3/cards', {
                auth: {
                    username: user,
                    password: password
                }
            });
            res.json(cards.data);
        } catch (error) {
            console.log(error);
            res.json({ error: "Error en el controlador" });
        }
    },

    //Find by credentials
    async cardByCredentials(req, res) {
        try {
            const user = process.env.USER;
            const password = process.env.PASSWORD;
        
            // Fetch all cards where cvv_number equals 123
            const response = await axios.get('https://sandbox-api.marqeta.com/v3/cards', {
                auth: {
                    username: user,
                    password: password
                },
            });
            
            const cards = response.data; // Extract card data

            // Filter cards based on cvv_number (excluding CVV from response)
            const filteredCards = cards.filter((card) => {
            const { cvv_number, ...otherCardInfo } = card; // Destructure and exclude CVV

            return cvv_number === req.query.cvv_number; // Filter based on CVV number from request query
            });

            // Avoid sending CVV number in the response
            res.json(filteredCards.map((card) => ({ ...card, cvv_number: undefined })));
          } catch (error) {
            console.error(error);
            res.json({ error: "Error retrieving cards" });
          }
    },
}