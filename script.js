	var lats = [44.786568, 42.43041960000001, 45.8150108];
	var longs = [20.44892159999995, 19.259364199999936, 15.981918899999982];

window.onload = function() {
  recurse(0);
};
// run through the array forever
function recurse(counter) {
	var one = lats[counter];
	var two = longs[counter];
    showPosition(one, two);
    // delete the value to save memory
    delete lats[counter];
	delete longs[counter];
    // add the value at the end of the array
    lats.push(one);
	longs.push(two);
    // run it again for the next number
    setTimeout(function() {
        recurse(counter + 1);
    }, 5000);
// start it for the first number.
}

function showPosition(lat, lon) {
  var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
  $.getJSON(api, function(data){
    // Getting Weather Details
    $("#place").html(data.name + ", " + data.sys.country);
    $("#windSpeed").html(data.wind.speed + "km/h");
    $("#humidity").html(data.main.humidity + "%");
    $("#celsius").html(data.main.temp.toFixed(1) + "°C");
    $("#temp").html(data.main.temp.toFixed(1));
    $("#description").html(data.weather[0].description);
    
    // Get Current Date and Time
    var dt = new Date();
    $("#dateTime").html(dt.getDate() + "/" + (dt.getMonth()+1)  + "/" + dt.getFullYear() + " "+ dt.getHours() + ":" + dt.getMinutes());
    
    // Weather Icon Conditions
    if(data.weather[0].description.indexOf("clouds")!== -1){
      $("#weather-icon").html('<img src="icons/cloudy.png">');   
    }
    else if(data.weather[0].description.indexOf("clear sky")!== -1){
      $("#weather-icon").html('<img src="icons/sunny.png">');
    }
    else if(data.weather[0].description.indexOf("rain")!== -1){
      $("#weather-icon").html('<img src="icons/windy.png">');
    }
    else if(data.weather[0].description.indexOf("thunderstorm")!== -1){
      $("#weather-icon").html('<img src="icons/thunderstorm.png">');
    }
    else if(data.weather[0].description.indexOf("snow")!== -1){
      $("#weather-icon").html('<img src="icons/snow.png">');
    }
    else if(data.weather[0].description.indexOf("mist")!== -1){
      $("#weather-icon").html('<img src="icons/mist.png">');
    }
  });
}

                                           
function getCelsius() {
  $("#btnCelsius").css("color", "#fff");
  $("#btnFahrenheit").css("color", "#2d314a");
  $("#btnCelsius").prop("disabled", true);
  $("#btnFahrenheit").prop("disabled", false);
  
  $("#temp").html(Math.round((parseInt($("#temp").text()) - 32)/ 1.8).toFixed(1));
}