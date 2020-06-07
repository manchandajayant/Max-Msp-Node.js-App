const maxApi = require("max-api");
var XMLhttprequest = require("xmlhttprequest").XMLHttpRequest;
let xhttp = new XMLhttprequest();
let res;
let url = "https://www.metaweather.com/api/location/search/?query=";
let urlWeather = "https://www.metaweather.com/api/location/";

maxApi.addHandler("makeRequest", (city) => {
  xhttp.open("GET", url + city, false);
  xhttp.send();

  let woeid = res[0]["woeid"];

  xhttp.open("GET", urlWeather + woeid + "/", false);
  xhttp.send();
  maxApi.post(res);
  maxApi.outlet(res.consolidated_weather[0]["wind_speed"]);
});

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    res = JSON.parse(this.responseText);
  }
};
