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

// if there are cities in memory from previous visit will call that data
var cityWish; 
if (buttArr == null) {
  cityWish = [];
} else if (buttArr !== null) {
  cityWish = JSON.parse(buttArr);
}

// function that will make buttons of previous cities visited if stored in memory
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

function makeHistory (){
  butt = document.createElement('button');
  butt.setAttribute("id", historyName);
  butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
  butt.innerText = historyName;
  list = document.getElementById("history");

  $( "#history" ).prepend( butt );
}


// adds button of searched city to list of city search buttons
function makeHay () {

  //   butt = document.createElement('button');
  // butt.setAttribute("id", historyName);
  // butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
  // butt.innerText = historyName;
  // list = document.getElementById("history");

    $( hSearch ).each(function( index ) {
    console.log( index + ": " + $( this ).text() );
    if ($( this ).text() == citySearch){
    $( this ).remove();
    }
  });

  makeHistory();
  
  // butt = document.createElement('button');
  // butt.setAttribute("id", historyName);
  // butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
  // butt.innerText = historyName;
  // list = document.getElementById("history");


  
  // $( "#history" ).prepend( butt );

  $( hSearch ).click(function(){
    citySearch = this.id;
    citySpot();
  });
  
  cityWish = [];
  
  $( hSearch ).each(function() {
    cityWish.push($( this ).text());
    localStorage.setItem('wishCities', JSON.stringify(cityWish));
  });

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
    console.log(trop, mer);
    // cityWish.unshift(historyName);
    // localStorage.setItem('wishCities', JSON.stringify(cityWish));
    
    makeHay();

    oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +JSON.stringify(trop)+ '&lon=' +JSON.stringify(mer)+ '&appid=91db1e3bfaa9e864b329e2d641b22377&units=imperial';
    
    fetch(oneCall)
    
    .then(function (response) {
      return response.json();
      })
      .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
    });

    });
}

function cityReset(){
  document.getElementById( "lookUp" ).value='';
}

// start active script
if (buttArr !== null){
  makeMemory();
}

console.log(hSearch.length);

bSearch.addEventListener("click", function(){
  citySearch = lookUp.value;
  citySpot();
  cityReset();
});

$( hSearch ).click(function(){
  citySearch = this.id;
  citySpot();
});