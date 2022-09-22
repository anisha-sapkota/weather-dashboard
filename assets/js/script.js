//  map of AU cities and their lat and long values
var auCities = {
  Sydney: {
    lat: "-33.865143",
    lon: "151.209900",
  },
  Melbourne: {
    lat: "-37.840935",
    lon: "144.946457",
  },
  Brisbane: {
    lat: "-27.470125",
    lon: "153.021072",
  },
  Hobart: {
    lat: "-42.880554",
    lon: "147.324997",
  },
  Adelaide: {
    lat: "-34.921230",
    lon: "138.599503",
  },
  Perth: {
    lat: "-31.953512",
    lon: "115.857048",
  },
  Canberra: {
    lat: "-35.282001",
    lon: "149.128998",
  },
  Darwin: {
    lat: "-12.462827",
    lon: "130.841782",
  },
};

// Auto complete for major AU cities
$("#searchInput").autocomplete({
  source: Object.keys(auCities),
});

// call handle search function when form is submitted
$("#search").on("submit", handleSearch);

// function for handle search
function handleSearch(event) {
  event.preventDefault();
  var searchString = $("#searchInput").val();
  saveToLocalStorage(searchString);
  renderRecentSearches();
  getWeatherData(searchString);
}

// fetch weather data using the API
function getWeatherData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=759e877d7eb31e0c9712b38d32b4c968`
  )
    .then((response) => response.json())
    .then((result) => renderWeatherData(result))
    .catch((error) => console.log("Error", error));
}

// function for rendering weather data
function renderWeatherData(data) {
  var city = data.city.name;
  var date = moment(data.list[0].dt, "X").format("DD/MM/YYYY");
  var temp = data.list[0].main.temp_max;
  var wind = data.list[0].wind.speed;
  var humidity = data.list[0].main.humidity;

  $("#cityAndDate").html(
    `${city} (${date})<img class="icon" src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"/>`
  );
  $("#temp").text(temp);
  $("#wind").text(wind);
  $("#humidity").text(humidity);

  $("#forecast").html("");

  for (var i = 0; i < data.list.length; i += 8) {
    var containerEl = $('<div class="col p-1">');
    var parentEl = $('<div class="border p-2">');
    var dateEl = $(
      `<h4>${moment(data.list[i].dt, "X").format(
        "DD/MM/YYYY"
      )} <img class="icon" src="http://openweathermap.org/img/wn/${
        data.list[i].weather[0].icon
      }@2x.png"/> </h4>`
    );
    var tempEl = $(
      `<p>Temp: ${data.list[i].main.temp_max}<span>&#8451;</span></p>`
    );
    var windEl = $(`<p>Wind: ${data.list[i].wind.speed}KPH</p>`);
    var humidityEl = $(`<p>Humidity: ${data.list[i].main.humidity}%</p>`);
    $(parentEl).append(dateEl);
    $(parentEl).append(tempEl);
    $(parentEl).append(windEl);
    $(parentEl).append(humidityEl);
    $(containerEl).append(parentEl);
    $("#forecast").append(containerEl);
  }
}

// Function for saving search to local-storage
function saveToLocalStorage(city) {
  // check for existing data
  var recentSearches = localStorage.getItem("recentSearches");
  if (recentSearches) {
    recentSearches = JSON.parse(recentSearches);
  } else {
    recentSearches = [];
  }
  // insert to start of array
  recentSearches.unshift(city);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
}

// Function for rendering recent searches from local-storage
function renderRecentSearches() {
  // get data from local-storage
  var recentSearches = localStorage.getItem("recentSearches");

  // if any data
  if (recentSearches) {
    var recentSearchesEl = $("#recentSearches");
    // clear the container
    $(recentSearchesEl).html("");
    // convert string to array
    recentSearches = JSON.parse(recentSearches);

    // for each recent search, create a button and render it
    for (var item of recentSearches) {
      var btnEL = $(`<button class="btn btn-secondary mb-2">${item}</button>`);
      $(btnEL).on("click", (event) => {
        getWeatherData(event.target.textContent);
      });
      $(recentSearchesEl).append(btnEL);
    }
  }
}

// init function
function init() {
  renderRecentSearches();
}

// call init
init();
