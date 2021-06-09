var lookUp = document.getElementById("lookUp");
var bSearch = document.getElementById("bSearch");
var hSearch = document.getElementsByClassName("saved-city");
var citySearch;
var requestUrl;
var oneCall;
var historyName;
var trop;
var mer;
var list = document.getElementById("history");
var buttArr = localStorage.getItem('wishCities');

var hotDiv = document.querySelector("#hotDiv");
var hotCity = document.querySelector("#hotCity");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var hu = document.querySelector("#hu");
var uv = document.querySelector("#uuuv");
var uvi = document.querySelector("#uv");
var hotPic = document.querySelector("#hotPic"); 


var aday1 = document.querySelector("#day1");
var aday2 = document.querySelector("#day2");
var aday3 = document.querySelector("#day3");
var aday4 = document.querySelector("#day4");
var aday5 = document.querySelector("#day5");



// if there are cities in memory from previous visit will call that data
var cityWish; 
if (buttArr == null) {
  cityWish = [];
} else if (buttArr !== null) {
  cityWish = JSON.parse(buttArr);
  makeMemory();
}

// function that will make buttons of previous cities visited if stored in memory and adds event listener
function makeMemory () {
    $( ".saved-city" ).remove();
  for(var i = 0; i < JSON.parse(buttArr).length; i++){
    butt = document.createElement('button');
    butt.setAttribute("id", JSON.parse(buttArr)[i]);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = JSON.parse(buttArr)[i];

    $( "#history" ).append( butt );


  }
      $( hSearch ).click(function(){
  citySearch = $(this).attr("id");
  citySpot ();
});
}

// API call with user entered city name
function citySpot(){
  requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +citySearch+ '&appid=7eaaaf52f588cae77cc5af8d7c91c78f&units=imperial';
  fetch(requestUrl)
  
  // prompts user to re-enter information if not a city /  to enter information if text box blank
  .then(function (response) {
    if (response.status === 404) {
      alert("City not found. Please try again.");
    } else if (citySearch.length == 0) {
      alert("Please enter a city name to search.");
      return false;
    } else {
      return response.json();
    }
  })
  
  // API return
  .then(function (data) {
    console.log(data);
    trop = (data.coord.lat);
    mer = (data.coord.lon);
    historyName = (data.name);

      // second API call with latitude & longitude info from initial request
      oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +JSON.stringify(trop)+ '&lon=' +JSON.stringify(mer)+ '&appid=7eaaaf52f588cae77cc5af8d7c91c78f&units=imperial';
    
      fetch(oneCall)
    
      .then(function (response) {
      return response.json();
      })

      .then(function (data) {
      //Using console.log to examine the data
      console.log(data);


// pull date out of api return
      var fullDate = new Date(parseInt(data.current.dt) * 1000);

      const month = fullDate.toLocaleString("en-US", {month: "numeric"}); 
      const day = fullDate.toLocaleString("en-US", {day: "numeric"});
      const year = fullDate.toLocaleString("en-US", {year: "numeric"});

      var date = month + "/" + day + "/" + year;

// changes background color of UVI based on the conditions
       if(data.current.uvi <= 2){
         uvi.setAttribute("class", "green d-inline");
        }else if(data.current.uvi > 2 && data.current.uvi <= 5){
         uvi.setAttribute("class", "yellow d-inline");
        }else if(data.current.uvi > 5 && data.current.uvi <= 7){
         uvi.setAttribute("class", "orange d-inline");
        }else if(data.current.uvi > 7 && data.current.uvi <= 10){
         uvi.setAttribute("class", "red d-inline");
        }else if(data.current.uvi > 10){
         uvi.setAttribute("class", "violet d-inline");
        }

      // pulls out info and builds top current weather information card
      hotCity.innerText = historyName + " " +date;
      hotDiv.setAttribute("class", "border border-secondary container-fluid");
      hotPic.setAttribute("src", "./assets/images/" +(data.current.weather[0].icon)+ ".png");
      temp.innerText = "Temp: " + (data.current.temp) + "°F";
      wind.innerText = "Wind: " + (data.current.wind_speed) + " MPH";
      hu.innerText = "Humidity: " + (data.current.humidity) + "%";
      uv.innerText = "UV Index: ";
      uvi.innerText = (data.current.uvi);

      
      // attributes that get the 5 day forecast cards to appear
      aday1.setAttribute("class", "border bg-light p-3");
      aday2.setAttribute("class", "border bg-light p-3");
      aday3.setAttribute("class", "border bg-light p-3");
      aday4.setAttribute("class", "border bg-light p-3");
      aday5.setAttribute("class", "border bg-light p-3");
      
      // pulling out info and builds cards for 5 day forecast
      var fullDate1 = new Date(parseInt(data.daily[1].dt) * 1000);

      const month1 = fullDate1.toLocaleString("en-US", {month: "numeric"}); 
      const day1 = fullDate1.toLocaleString("en-US", {day: "numeric"});
      const year1 = fullDate1.toLocaleString("en-US", {year: "numeric"});

      var dateYo1 = month1 + "/" + day1 + "/" + year1;

      icon1.setAttribute("src", "./assets/images/" +(data.daily[1].weather[0].icon)+ ".png");
      date1.innerText = (dateYo1);
      temp1.innerText = "Temp: " + (data.daily[1].temp.day) + "°F";
      wind1.innerText = "Wind: " + (data.daily[1].wind_speed) + " MPH";
      hu1.innerText = "Humidity: " + (data.daily[1].humidity) + "%";

      var fullDate2 = new Date(parseInt(data.daily[2].dt) * 1000);

      const month2 = fullDate2.toLocaleString("en-US", {month: "numeric"}); 
      const day2 = fullDate2.toLocaleString("en-US", {day: "numeric"});
      const year2 = fullDate2.toLocaleString("en-US", {year: "numeric"});

      var dateYo2 = month2 + "/" + day2 + "/" + year2;

      icon2.setAttribute("src", "./assets/images/" +(data.daily[2].weather[0].icon)+ ".png");
      date2.innerText = (dateYo2);
      temp2.innerText = "Temp: " + (data.daily[2].temp.day) + "°F";
      wind2.innerText = "Wind: " + (data.daily[2].wind_speed) + " MPH";
      hu2.innerText = "Humidity: " + (data.daily[2].humidity) + "%";

      var fullDate3 = new Date(parseInt(data.daily[3].dt) * 1000);

      const month3 = fullDate3.toLocaleString("en-US", {month: "numeric"}); 
      const day3 = fullDate3.toLocaleString("en-US", {day: "numeric"});
      const year3 = fullDate3.toLocaleString("en-US", {year: "numeric"});

      var dateYo3 = month3 + "/" + day3 + "/" + year3;

      icon3.setAttribute("src", "./assets/images/" +(data.daily[3].weather[0].icon)+ ".png");
      date3.innerText = (dateYo3);
      temp3.innerText = "Temp: " + (data.daily[3].temp.day) + "°F";
      wind3.innerText = "Wind: " + (data.daily[3].wind_speed) + " MPH";
      hu3.innerText = "Humidity: " + (data.daily[3].humidity) + "%";

      var fullDate4 = new Date(parseInt(data.daily[4].dt) * 1000);

      const month4 = fullDate4.toLocaleString("en-US", {month: "numeric"}); 
      const day4 = fullDate4.toLocaleString("en-US", {day: "numeric"});
      const year4 = fullDate4.toLocaleString("en-US", {year: "numeric"});

      var dateYo4 = month4 + "/" + day4 + "/" + year4;

      icon4.setAttribute("src", "./assets/images/" +(data.daily[4].weather[0].icon)+ ".png");
      date4.innerText = (dateYo4);
      temp4.innerText = "Temp: " + (data.daily[4].temp.day) + "°F";
      wind4.innerText = "Wind: " + (data.daily[4].wind_speed) + " MPH";
      hu4.innerText = "Humidity: " + (data.daily[4].humidity) + "%";

     var fullDate5 = new Date(parseInt(data.daily[5].dt) * 1000);

      const month5 = fullDate5.toLocaleString("en-US", {month: "numeric"}); 
      const day5 = fullDate5.toLocaleString("en-US", {day: "numeric"});
      const year5 = fullDate5.toLocaleString("en-US", {year: "numeric"});

      var dateYo5 = month5 + "/" + day5 + "/" + year5;

      icon5.setAttribute("src", "./assets/images/" +(data.daily[5].weather[0].icon)+ ".png");
      date5.innerText = (dateYo5);
      temp5.innerText = "Temp: " + (data.daily[5].temp.day) + "°F";
      wind5.innerText = "Wind: " + (data.daily[5].wind_speed) + " MPH";
      hu5.innerText = "Humidity: " + (data.daily[5].humidity) + "%";
      })

  newInTown ();
        
  })
}

// if no cities in history creates button for initial city searched, adds city name to empty array and stores array in memory
function startHistory () {
    butt = document.createElement('button');
    butt.setAttribute("id", historyName);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = historyName;

    $( "#history" ).append( butt );

    $( hSearch ).click(function(){
    citySearch = $(this).attr("id");
    citySpot ();
    cityReset();
    });
}

// if user searches for a city that is already in history, this function is meant to remove a that button adn crate a new button, but i can't get it to work
// function makeHistory (){
//   $( ".saved-city" ).remove();
//   for(var i = 0; i < cityWish.length; i++){
//     butt = document.createElement('button');
//     butt.setAttribute("id", cityWish[i]);
//     butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
//     butt.innerText = cityWish[i];

//     $( "#history" ).append( butt );
//   }
// }

function newInTown () {
// adds city user searches for to the end of saved city array.  If a city that is searched for is already on the array of saved city names initial entry  will be removed & new entry will be added to the end. Saves new list of cities to local storage.
  if (cityWish.indexOf(historyName) === -1){
    cityWish.push(historyName)
    localStorage.setItem("wishCities", JSON.stringify(cityWish));
    startHistory ();
  } else {
    let temparr = []
    for(let  i=0; i<cityWish.length; i++){
    
    if (cityWish[i] !== historyName){
      temparr.push(cityWish[i]);
    } else {
      temparr.push(historyName);
    }

  }     
  cityWish = temparr;
      localStorage.setItem("wishCities", JSON.stringify(cityWish));
  }
}

// clears input box once search initiated
function cityReset(){
  document.getElementById( "lookUp" ).value='';
}

// search button listener event
bSearch.addEventListener("click", function(){
  citySearch = lookUp.value;
  console.log(cityWish);
  console.log(citySearch);
  citySpot ();
  cityReset();
});