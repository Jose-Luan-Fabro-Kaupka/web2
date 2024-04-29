const service = require('../services/ArtigosService');

exports.renderHome = async (req, res) => {
    try {
        if (!req.user) {
            service.artigosConsultar().then(artigos =>{
                return res.render('home', {
                    artigos: artigos
                });
            })

        }
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
}
