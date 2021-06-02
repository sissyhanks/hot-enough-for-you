var lookUp = document.getElementById("lookUp");
var bSearch = document.getElementById("bSearch");
var citySearch;
var requestUrl;
var oneCall;
var historyName;
var trop;
var mer;
var cityWish;
var newUse;




bSearch.addEventListener("click", function(){
citySearch = lookUp.value;
requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +citySearch+ '&appid=91db1e3bfaa9e864b329e2d641b22377&units=imperial';

fetch(requestUrl)

    .then(function (response) {
      if (response.status === 404) {
        alert("City not found. Please try again.");
      } else if (citySearch.length == 0) {
        alert("Please enter a city name to begin your search");
        return false;
      } else {
        return response.json();
      }
      
    })

      .then(function (data) {
        console.log(data);
      //Using console.log to examine the data
      trop = (data.coord.lat);
      mer = (data.coord.lon);
      historyName = (data.name);
      console.log(trop, mer);
      // localStorage.setItem('cityWish', data.name);
      // newUse = localStorage.getItem(JSON.stringify(cityWish));

      butt = document.createElement('button');
      butt.setAttribute("id", historyName);
      butt.setAttribute("class", "saved-city btn w-100 text-center mt-2")
      butt.innerText = historyName;

    $( "#history" ).prepend( butt );

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

  });








