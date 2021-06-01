var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=columbus&appid=2a18f31beac1a23911dca33073641a3b'

fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)})