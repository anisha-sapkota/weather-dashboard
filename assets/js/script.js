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

var searchInputEl = $("#searchInput");

$(searchInputEl).autocomplete({
  source: Object.keys(auCities),
});

$("#search").on("submit", handleSearch);

function handleSearch(event) {
  event.preventDefault();
  var searchString = $("#searchInput").val();
  saveToLocalStorage(searchString);
  renderRecentSearches();
  getWeatherData(searchString);
}

function getWeatherData(city) {
  console.log(city);
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

function init() {
  renderRecentSearches();
}

init();
