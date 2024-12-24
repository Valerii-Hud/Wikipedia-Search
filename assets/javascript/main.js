document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.querySelector(".search-form");
  const inputElement = document.querySelector('input[type="text"]');
  const searchResultsContainer = document.querySelector(".search-results");
  const resultsCountDisplay = document.querySelector(".results-count");

  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = inputElement.value.trim();
    if (query) {
      fetchWikipediaData(query);
    } else {
      alert("Please enter a search term.");
    }
  });

  function fetchWikipediaData(query) {
    const apiUrl = `https://pl.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(
      query
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        renderSearchResults(data.query.search);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to fetch results. Please try again later.");
      });
  }

  function renderSearchResults(results) {
    searchResultsContainer.innerHTML = "";
    resultsCountDisplay.textContent = `Results: ${results.length}`;

    if (results.length === 0) {
      alert("No results found. Try a different search term.");
      return;
    }

    results.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");
      resultItem.innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.snippet}</p>
        <a href="https://pl.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
      `;
      searchResultsContainer.appendChild(resultItem);
    });
  }
});
