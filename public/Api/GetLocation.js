var Celsius,Description;
var Executed = false;

// Step 1: Get user coordinates
function getCoordintes() { 
	var options = { 
		enableHighAccuracy: true, 
		timeout: 5000, 
		maximumAge: 0 
	}; 

	function success(pos) { 
		var crd = pos.coords; 
		var lat = crd.latitude.toString(); 
		var lng = crd.longitude.toString(); 
		var coordinates = [lat, lng]; 
		console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
		getCity(coordinates); 
		return; 

	} 

	function error(err) { 
		console.warn(`ERROR(${err.code}): ${err.message}`); 
	} 

	navigator.geolocation.getCurrentPosition(success, error, options); 
} 

// Step 2: Get city name
function getCity(coordinates) { 
	var xhr = new XMLHttpRequest(); 
	var lat = coordinates[0]; 
	var lng = coordinates[1]; 

	// Paste your LocationIQ token below.
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.db6b5613a34db29a0d33169822c6d0b7&lat=" + 
	lat + "&lon=" + lng + "&format=json", true); 
	xhr.send(); 
	xhr.onreadystatechange = processRequest; 
	xhr.addEventListener("readystatechange", processRequest, false); 

	function processRequest(e) { 
		if (xhr.readyState == 4 && xhr.status == 200) { 
			var response = JSON.parse(xhr.responseText); 
			var city = response.address.city; 
            console.log(city); 
            getWeatherDetail(city);
			return ; 
		} 
	} 
} 


function getWeatherDetail(city){

    const ApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c353dd7920653f9fe77d12dbf64badc4&units=metric`
    axios.get(ApiLink)
    .then((response) =>{

        if(Executed === false){  // to avoid Loop
       console.log(response.data) ;
       const GetWeatherHtml = document.getElementById('celsius');
       const GetWeatherDescription = document.getElementById('WeatherDescription');
       const GetWeatherCity = document.getElementById('City');
        console.log(GetWeatherCity);    
         Celsius = response.data.main.feels_like.toString()
         Description = response.data.weather[0].description;
         GetWeatherHtml.innerHTML = Celsius.split('.')[0] + '&#8451'
         GetWeatherDescription.innerHTML = Description + `  in ${city}`;
        Executed = true;
        }
    })
    .catch(err => console.log(err));
}



getCoordintes(); 

