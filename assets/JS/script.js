const APIKey = "6c34cdcabb1cb26f290379ff7a6a723b";
const searchBtnEl = document.querySelector("#search-btn");
const clearHistoryBtnEl = $("#clear-history");

// let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

let cityInput = document.querySelector("#city-search");
let searchList = document.querySelector("#recent-searches");

let searchHistory = [];

function renderHistory() {
  searchList.innerHTML = "";

  for (let i = 0; i < searchHistory.length; i++) {
    const citySearch = searchHistory[i];

    let li = document.createElement("li");
    li.textContent = citySearch;
    li.setAttribute("data-index", i);

    let button = document.createElement("button");
    button.textContent = "Remove ";

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
