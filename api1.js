const express = require('express'); //Import Express
const app = express(); //Create Express Application on the app variable
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.get('/', (req, res) => {
    console.log('original url', req.originalUrl);


    var citydata = req.originalUrl.split('?')[1];
    var city = citydata.split('=')[1];
    var http = new XMLHttpRequest();
    var url = 'https://openweathermap.org/data/2.5/weather?q=' + city + '&appid=b6907d289e10d714a6e88b30761fae22'
    console.log('url', url);
    http.open('POST', url, true);
    http.withCredentials = true;
    http.onreadystatechange = () => {
        if (http.readyState == 4) {

            if (http.status == 200) {
                var data = JSON.parse(http.responseText);
                res.send(data);
            } else if (http.status == 0 || http.status == 500) {
                res.send('Internal server Error Please give proper City Name')
            }

        } else if (http.readyState == 0 || http.readyState == 1 || http.readyState == 2 || http.readyState == 3) {
            console.log("Waiting for response.");
        }
    }
    http.send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));