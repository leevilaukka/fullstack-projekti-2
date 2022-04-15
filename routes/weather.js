const router = require("express").Router();
const api = require("../public/api.js");

router.get("/", async (req, res) => {
    res.render("weather");
});

// Hae kaupunkia
router.get("/city", (req, res) => {
    const query = req.query.city;

    const city = api.citySearch(query)
        .then(data => {
            console.log(data);
            res.json(data);
        }
    ).catch(error => {
        console.log(error);
        res.status(503).json({error: error});
    });

    api.setCurrentCity(city[0]);
});

// Hae säätiedot
router.get("/currentWeather", (req, res) => {
    const cityKey = req.query.cityKey;
    api.cityWeather(cityKey).then(data => {
        res.json(data);
    }).catch(error => {
        console.log(error);
        res.status(503).json({error: error});
    });;
});

// Hae sääennusteet
router.get("/forecast", (req, res) => {
    const cityKey = req.query.cityKey;
    api.cityForecast(cityKey).then(data => {
        res.json(data);
    }).catch(error => {
        console.log(error);
        res.status(503).json({error: error});
    });;
});

// Hae kaikki
router.get("/all", async (req, res) => {
    const cityKey = req.query.cityKey;
    const current = await api.cityWeather(cityKey);
    const forecast = await api.cityForecast(cityKey);

    res.json({
        current: current,
        forecast: forecast
    }).catch(error => {
        console.log(error);
        res.status(503).json({error: error});
    });;
});

module.exports = router;