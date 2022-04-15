// express init
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());

// route imports 
app.use("/", require("./routes/home"));
app.use("/weather", require("./routes/weather"));
app.use("/forecast", require("./routes/forecast"));


app.listen(port, () => {
    console.log(`Weather app listening on port ${port}`)
})