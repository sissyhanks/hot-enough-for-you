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
var list;
var buttArr = localStorage.getItem('wishCities');

var cityWish; 
if (buttArr == null) {
 cityWish = [];
} else if (buttArr !== null) {
  cityWish = JSON.parse(buttArr);
}

console.log(cityWish);

function makeMemory () {
  for(var i = 0; i < JSON.parse(buttArr).length; i++){
    butt = document.createElement('button');
    butt.setAttribute("id", JSON.parse(buttArr)[i]);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = JSON.parse(buttArr)[i];
    list = document.getElementById("history");

    $( "#history" ).append( butt );
  }
}

function makeHistory () {
    butt = document.createElement('button');
    butt.setAttribute("id", historyName);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = historyName;
    list = document.getElementById("history");

    $( "#history" ).prepend( butt );
}

function cityReset(){
  document.getElementById( "lookUp" ).value='';
}

// start active script
if (buttArr !== null){
  makeMemory();
}

bSearch.addEventListener("click", function(){
  citySearch = lookUp.value;
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
    console.log(trop, mer);
    cityWish.unshift(historyName);
    localStorage.setItem('wishCities', JSON.stringify(cityWish));
    
    makeHistory();

    oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +JSON.stringify(trop)+ '&lon=' +JSON.stringify(mer)+ '&appid=91db1e3bfaa9e864b329e2d641b22377&units=imperial';
      
    fetch(oneCall)
    
    .then(function (response) {
      return response.json();
      })
      .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
    })


    })
    cityReset();

  });
