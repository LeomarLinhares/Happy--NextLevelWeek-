const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');
var request = require("request");

var url = "https://geolocation-db.com/json";
var location;

module.exports = {
    async index(req, res) {
        await request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                location = body
                console.log({location});
                return res.render('index', {location});
            }
        });
    },

    async orphanage(req, res) {
        const id = req.query.id

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);
            const orphanage = results[0];

            orphanage.images = orphanage.images.split(',');
            orphanage.firstImage = orphanage.images[0];

            orphanage.open_on_weekends == "0" ? 
                orphanage.open_on_weekends = false
                :
                orphanage.open_on_weekends = true;

            return res.render('orphanage', {orphanage: orphanage});
        } catch(error) {
            console.log(error);
            return res.send('Erro no banco de dados!');
        }
    },

    async orphanages(req, res) {
        try {
            const db = await Database;
            const orphanages = await db.all("SELECT * FROM orphanages")

            await request({
                url: url,
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    location = body;
                    return res.render('orphanages', {orphanages, location})
                }
            });
            
        } catch(error) {
            console.log(error);
            return res.send('Erro no banco de dados!');
        }
    },

    createOrphanage(req, res) {
        return res.render('create-orphanage')
    },

    async saveOrphanage(req, res) {
        const fields = req.body

        // Validar se todos os campos estão preenchidos
        if (Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos!')
        }

        // Salvar um orfanato
        try {
            const db = await Database
            await saveOrphanage(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends
            })

            // Redirecionamento
            return res.redirect('/orphanages')

        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados!')
        }
    }
}