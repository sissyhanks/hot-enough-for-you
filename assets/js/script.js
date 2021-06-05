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

function cityReset(){
  document.getElementById( "lookUp" ).value='';
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
      //Using console.log to examine the data
      trop = (data.coord.lat);
      mer = (data.coord.lon);
      historyName = (data.name);
      console.log(trop, mer);
      localStorage.setItem('cityWish', JSON.stringify(historyName));
      // newUse = localStorage.getItem(JSON.stringify(cityWish));
      console.log(localStorage.getItem('cityWish'));

      butt = document.createElement('button');
      butt.setAttribute("id", historyName);
      butt.setAttribute("class", "saved-city btn w-100 text-center mt-2")
      butt.innerText = historyName;

      var list = document.getElementById("history");
      var cities = list.getElementsByTagName("button");

      console.log(cities.id);
      // console.log(cities);
      for (var i = 0; i < list.length; i++) {
        console.log(cities);
        // if (historyName == list[i].id){
        //   cities.remove();
        // }
      }

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
    cityReset();

  });








