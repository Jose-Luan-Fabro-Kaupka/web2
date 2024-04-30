const service = require('../services/ArtigosService');

exports.renderHome = async (req, res) => {
    try {
            service.artigosConsultar().then(artigos =>{
                return res.render('home', {
                    artigos: artigos,
                    usuario: req.user
                });
            })
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
}
