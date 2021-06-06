var lookUp = document.getElementById("lookUp");
var bSearch = document.getElementById("bSearch");
var citySearch;
var requestUrl;
var oneCall;
var historyName;
var trop;
var mer;
var newUse;
var list;
var cityWish = [];
var buttArr = localStorage.getItem('wishCities');

console.log(buttArr);

if (buttArr !== null){
  makeMemory();
}

function cityReset(){
  document.getElementById( "lookUp" ).value='';
}

function makeMemory () {
  for(var i = 0; i < JSON.parse(buttArr).length; i++){
    butt = document.createElement('button');
    butt.setAttribute("id", JSON.parse(buttArr)[i]);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = JSON.parse(buttArr)[i];
    list = document.getElementById("history");
    var cities = list.getElementsByTagName("button");

    $( "#history" ).append( butt );
    console.log($(butt).attr("id"));
    console.log(cities);
  }
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

    

    // console.log(buttArr.length);

    // for var i = 0; i < (localStorage.getItem('wishCities')).length

    butt = document.createElement('button');
    butt.setAttribute("id", historyName);
    butt.setAttribute("class", "saved-city btn w-100 text-center mt-2");
    butt.innerText = historyName;

    list = document.getElementById("history");
    var cities = list.getElementsByTagName("button");

    $( "#history" ).prepend( butt );
          console.log($(butt).attr("id"));
      console.log(cities);

// for (var i = 0; i < $( "#history" ).length; i++) {
//     var buttList = $(list)[i];
//     console.log(buttList);
//     for (var j = 0; j < buttList.length; j++){
//       var buttId = $(buttList)[i];
//       console.log(buttId);

    // }
    
    // }

    console.log(list);

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








