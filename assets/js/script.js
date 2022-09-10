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

$("#searchInput").autocomplete({
  source: Object.keys(auCities),
});

fetch(
  "https://api.openweathermap.org/data/2.5/onecall?lat=-37.840935&lon=144.946457&appid=5255353a444216b188ddc85fa361479c&units=metric"
)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("HTTP error", response);
  })
  .then(function (data) {
    console.log(data);
  });
