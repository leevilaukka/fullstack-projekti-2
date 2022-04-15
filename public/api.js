const axios = require('axios');

class API {
    constructor(apikey) {
        this.apikey = apikey;
        this.baseUrl = 'http://dataservice.accuweather.com';
        this.currentCity = null;
    }

    getURL(url, params) {
        return `${this.baseUrl}${url}?${params}&apikey=${this.apikey}&language=fi-fi`;
    }

    getCurrentCity() {
        console.log(this.currentCity);
        return this.currentCity;
    }

    setCurrentCity(city) {
        console.log("City set to: " + city);
        this.currentCity = city;
    }

    citySearch(city) {
        return new Promise((resolve, reject) => {
            const url = this.getURL(`/locations/v1/cities/search/`, `q=${city}`);
            axios.get(url)
                .then(response => response.data)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    cityWeather(cityKey) {
        return new Promise((resolve, reject) => {
            const url = this.getURL(`/currentconditions/v1/${cityKey}`, '');
            axios.get(url)
                .then(response => response.data)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    cityForecast(cityKey) {
        return new Promise((resolve, reject) => {
            const url = this.getURL(`/forecasts/v1/daily/5day/${cityKey}`);
            axios.get(url)
                .then(response => response.data)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    cityHourly() {
        return new Promise((resolve, reject) => {
            const url = getURL(`/forecasts/v1/hourly/12hour/${cityKey}`);
            axios.get(url)
                .then(response => response.data)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    async getAll() {
        const forecast = this.cityForecast();
        const weather = this.cityWeather();
        const hourly = this.cityHourly();
        return {
            forecast: await forecast,
            weather: await weather,
            hourly: await hourly
        };
    }
}

module.exports = new API(process.env.API_KEY);