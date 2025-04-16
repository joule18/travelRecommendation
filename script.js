const allResultsContainer = document.getElementById("all-results-container-id");
const searchInput = document.getElementById("search-input-id");

const validKeywords = [
  "beach",
  "beaches",
  "country",
  "countries",
  "temple",
  "temples",
];

async function fetchDB() {
  try {
    let fetchResult = await fetch("travel_recommendation_api.json", {
      method: "GET",
    });
    let fetchData = await fetchResult.json();
    return fetchData;
  } catch (error) {
    console.log("An error occurred when fetching data.");
  }
}

async function searchRecommendation() {
  let searchQuery = searchInput.value.toLowerCase().trim();

  if (searchQuery.length === 0) {
    return;
  }

  if (validKeywords.includes(searchQuery)) {
    let singularToPlural = {
      country: "countries",
      temple: "temples",
      beach: "beaches",
    };

    if (singularToPlural[searchQuery]) {
      searchQuery = singularToPlural[searchQuery];
    }

    let allData = await fetchDB();

    let searchData = allData[searchQuery];

    if (searchQuery === "countries") {
      let formattedCountryData = [];
      searchData.forEach(({ id, cities }) => {
        cities.forEach(({ name, imageUrl, description }) => {
          let singleCountry = {
            id,
            name,
            imageUrl,
            description,
          };
          formattedCountryData.push(singleCountry);
        });
      });
      searchData = formattedCountryData;
    }

    let results = "";

    searchData.forEach(({ name, imageUrl, description }) => {
      results += `<div class="result-container">
              <img src="images/paris.jpg" alt="${name}" class="location-img" />
              <div class="desc-container">
                <div class="location-name">${name}</div>
                <div class="location-desc">
                  ${description}
                </div>
                <button class="visit-btn">Visit</button>
              </div></div>`;
    });

    allResultsContainer.innerHTML = results;
  } else {
    alert("Please enter a valid search query.");
  }
}

function clearRecommendation() {
  searchInput.value = "";
  allResultsContainer.innerHTML = "";
}
