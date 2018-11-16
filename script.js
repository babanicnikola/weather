	var lats = [44.802048, 42.43041960000001, 45.8150108, 47.497912, 44.42];
	var longs = [20.466073599999998, 19.259364199999936, 15.981918899999982, 19.04023499999994, 26.10];
	
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
    }, 5000); //Delay in seconds for city to change
	console.log(counter);
	return counter;
}

function showPosition(lat, lon) {
  var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
  $.getJSON(api, function(data){
    // Getting Weather Details
    $("#place").html(data.name + ", " + data.sys.country);
    $("#windSpeed").html(data.wind.speed + "km/h");
    $("#humidity").html(data.main.humidity + "%");
    $("#temp").html(data.main.temp.toFixed(1) + " °C");
    $("#description").html(data.weather[0].description);
    
    // Get Current Time
    var dt = new Date();
    var time = dt.getHours();
  
    // Weather Icon Conditions
    if(data.weather[0].description.indexOf("clouds")!== -1){
      if (time < 17 && time > 6)
			$("#weather-icon").html('<img src="icons/cloudy.png">');
		else if (time > 16 || time < 7)
			$("#weather-icon").html('<img src="icons/cloudy_night.png">');
    }
    else if(data.weather[0].description.indexOf("clear sky")!== -1){
		if (time < 17 && time > 6)
			$("#weather-icon").html('<img src="icons/sunny.png">');
		else if (time > 16 || time < 7)
			$("#weather-icon").html('<img src="icons/moon.png">');
    }
    else if(data.weather[0].description.indexOf("rain")!== -1){
      $("#weather-icon").html('<img src="icons/rain.png">');
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
