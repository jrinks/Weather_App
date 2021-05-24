
//define function for what to do if position data is obtained
function getCoords(latitude, longitude) {
    // save the lat and long to variables
    //console.log lat and long
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    //send the lat and long to display in html
    document.getElementById("lat").innerHTML = "Your current latitude is " +latitude;
    document.getElementById("long").innerHTML = "Your current longitude is " +longitude;
    //call to the function that gets weather data from the api
    fetchWeather(latitude, longitude)
    fetchTime(latitude, longitude)
}

//fetch weather
async function fetchWeather(latitude, longitude){
    var weather_key = config.weather_key
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_key}`)
    if (response.ok) { 
        // if HTTP-status is 200-299
        console.log('data received successfully')    
        // get the response body (the method explained below)
        let data = await response.json();
        console.log(data)
        saveWeatherInfo(data)
    } 
    else {
      alert("HTTP-Error: " + response.status);
    }
}

//save weather info to variables
function saveWeatherInfo(data){
    console.log('run save info')
    let temperature = Math.floor(data.main.temp * 9/5 - 459.67);
    console.log(temperature)
    let description = data.weather[0].description;
    console.log(description)
    let city = data.name;
    console.log(city)
    let country =  data.sys.country;
    console.log(country)
    let icon_code =  data.weather[0].icon;
    console.log(icon_code)
    displayWeather(temperature, description, city, country, icon_code);
}

  

//define function that displays the weather info in HTML
function displayWeather(temperature, description, city, country, icon_code){
    const img = document.querySelector('#weatherIcon');
    img.setAttribute('src', `http://openweathermap.org/img/wn/${icon_code}@2x.png`);
    document.getElementById("temp").innerHTML = temperature+"°";
    document.getElementById("description").innerHTML = description.toUpperCase();
    document.getElementById("location").innerHTML = "Current Location "+city+", "+country;
    document.getElementById("header_location").innerHTML = "Current Conditions in "+city+", "+country;
}


//see if coordinates are available, then pass them to the success function
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    getCoords(latitude, longitude)
  });


//Get current time
async function fetchTime(latitude, longitude){
    var time_key = config.time_key
    let response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${time_key}&format=json&by=position&lat=${latitude}&lng=${longitude}`)
    if (response.ok) { 
        // if HTTP-status is 200-299
        console.log('time data received successfully')    
        // get the response body (the method explained below)
        let timedata = await response.json();
        console.log(timedata)
        let zone = timedata.abbreviation
        let split_time = timedata.formatted.split(' ')
        console.log(split_time[1])
        document.getElementById("date").innerHTML = "Current Date: "+split_time[0];
        document.getElementById("time").innerHTML = "Current Time: "+split_time[1]+" "+zone;
    } 
    else {
      alert("Time HTTP-Error: " + response.status);
    }
}

