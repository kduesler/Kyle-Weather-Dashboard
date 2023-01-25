

const APIKey = "6c34cdcabb1cb26f290379ff7a6a723b";
const searchBtnEl = document.querySelector("#search-btn");
const clearHistoryBtnEl = $("#clear-history");
const cityHeader = document.querySelector("#city-header");

const date = dayjs();
const date2 = date.add(1, "day");
const date3 = date.add(2, "day");
const date4 = date.add(3, "day");
const date5 = date.add(4, "day");
const day1 = date.format("MMMM D, YYYY");
const day2 = date2.format("MMMM D YYYY");
const day3 = date3.format("MMMM D, YYYY");
const day4 = date4.format("MMMM D, YYYY");
const day5 = date5.format("MMMM D, YYYY");

$("#day1").html(day1);
$("#day2").html(day2);
$("#day3").html(day3);
$("#day4").html(day4);
$("#day5").html(day5);

let cityInput = document.querySelector("#city-search");
let searchList = document.querySelector("#recent-searches");

let searchHistory = [];

function renderWeather(data) {
  for (let i = 0; i <= 32; i += 8) {
    let tempEl = document.querySelector(`#temp${i}`);
    tempEl.textContent = `Temp: ${data.list[i].main.temp} °F`;
  }

  for (let i = 0; i <= 32; i += 8) {
    let iconEl = document.querySelector(`#icon${i}`);
    iconEl.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
    );
  }

  for (let i = 0; i <= 32; i += 8) {
    let windEl = document.querySelector(`#wind${i}`);
    windEl.textContent = `Wind: ${data.list[i].wind.speed} mph`;
  }

  for (let i = 0; i <= 32; i += 8) {
    let humidityEl = document.querySelector(`#humidity${i}`);
    humidityEl.textContent = `Humidity: ${data.list[i].main.humidity}%`;
  }

  console.log(data)
}

function fetchWeather(city) {
  cityHeader.textContent = city;
  let queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderWeather(data);
      console.log(data)
    });
}

function renderHistory() {
  searchList.innerHTML = "";

  for (let i = 0; i < searchHistory.length; i++) {
    const citySearch = searchHistory[i];

    let li = document.createElement("li");
    li.textContent = citySearch + " ";
    li.setAttribute("data-index", i);

    li.addEventListener("click", function () {
      fetchWeather(citySearch);
    });

    let button = document.createElement("button");
    button.textContent = "X";

    li.appendChild(button);
    searchList.appendChild(li);
  }
}

function loadPage() {
  let storedCities = JSON.parse(localStorage.getItem("Search History"));

  if (storedCities !== null) {
    searchHistory = storedCities;
  }

  renderHistory();
}

function storeCities() {
  localStorage.setItem("Search History", JSON.stringify(searchHistory));
}

searchBtnEl.addEventListener("click", function (event) {
  let cityText = cityInput.value.trim();

  if (cityText === "") {
    return;
  }

  searchHistory.push(cityText);
  cityInput.value = "";

  storeCities();
  renderHistory();
  fetchWeather(cityText);
});

$(document).ready(function () {
  $(searchList).click(function (event) {
    let element = event.target;
    if (element.matches("button") === true) {
      let index = element.parentElement.getAttribute("data-index");
      searchHistory.splice(index, 1);

      storeCities();
      renderHistory();
    }
  });
});

loadPage();

$(document).ready(function () {
  clearHistoryBtnEl.click(function () {
    $("li").remove();
    localStorage.clear();
    searchHistory = [];
  });
});