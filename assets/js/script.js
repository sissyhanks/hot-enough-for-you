var lookUp = document.getElementById("lookUp");
var bSearch = document.getElementById("bSearch");
var hSearch = document.getElementsByClassName("saved-city");
var citySearch;
var requestUrl;
var oneCall;
var historyName;
var trop;
var mer;
var newUse;
var list = document.getElementById("history");
var buttArr = localStorage.getItem('wishCities');

var hotCity = document.querySelector("#hotCity");
var wind = document.querySelector("#wind");
var hu = document.querySelector("#hu");
var uvi = document.querySelector("#uv");



// if there are cities in memory from previous visit will call that data
var cityWish; 
if (buttArr == null) {
  cityWish = [];
} else if (buttArr !== null) {
  cityWish = JSON.parse(buttArr);
  makeMemory();
}

// function that will make buttons of previous cities visited if stored in memory
function makeMemory () {
    $( ".saved-city" ).remove();
  for(var i = 0; i < JSON.parse(buttArr).length; i++){
    butt = document.createElement('button');
    butt.setAttribute("id", JSON.parse(buttArr)[i]);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = JSON.parse(buttArr)[i];

    $( "#history" ).append( butt );
  }
}

function citySpot(){
  requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +citySearch+ '&appid=91db1e3bfaa9e864b329e2d641b22377&units=imperial';
  fetch(requestUrl)
  
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
  
  .then(function (data) {
    console.log(data);
    trop = (data.coord.lat);
    mer = (data.coord.lon);
    historyName = (data.name);

      oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +JSON.stringify(trop)+ '&lon=' +JSON.stringify(mer)+ '&appid=91db1e3bfaa9e864b329e2d641b22377&units=imperial';
    
      fetch(oneCall)
    
      .then(function (response) {
      return response.json();
      })

      .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
      hotCity.innerText = ("hi");
      wind.innerText = (data.current.wind_speed);
      hu.innerText = (data.current.humidity);
      uvi.innerText = (data.current.uvi);
      })

  newInTown ();
        
  })
}

function startHistory () {
    butt = document.createElement('button');
    butt.setAttribute("id", cityWish);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = cityWish;

    $( "#history" ).append( butt );
}

function makeHistory (){
  $( ".saved-city" ).remove();
  for(var i = 0; i < cityWish.length; i++){
    butt = document.createElement('button');
    butt.setAttribute("id", cityWish[i]);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = cityWish[i];

    $( "#history" ).append( butt );
  }
}

function newInTown () {
  console.log(historyName);

  if (cityWish.indexOf(historyName) === -1){
      cityWish.push(historyName)
            localStorage.setItem("wishCities", JSON.stringify(cityWish));
            startHistory ();
  }
  else {
  let temparr = []
  for(let  i=0; i<cityWish.length; i++){
    
    if (cityWish[i] !== historyName){
      temparr.push(cityWish[i]);
      // makeHistory ();
    } else {
      temparr.push(historyName);
      console.log(historyName);
      // makeHistory ();
    }
    // makeHistory ();
  }     
  cityWish = temparr;
      localStorage.setItem("wishCities", JSON.stringify(cityWish));
  }
}

function cityReset(){
  document.getElementById( "lookUp" ).value='';
}

bSearch.addEventListener("click", function(){
  citySearch = lookUp.value;
  console.log(cityWish);
  console.log(citySearch);
  citySpot ();
  cityReset();
});

$( hSearch ).click(function(){
  citySearch = $(this).attr("id");
  console.log(cityWish);
  console.log(citySearch);
  citySpot ();
  cityReset();
});

