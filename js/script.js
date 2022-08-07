const form = document.querySelector(".js-form");
form.addEventListener("submit", handleSubmit);
const nextBtn = document.querySelector(".js-next");
const prevBtn = document.querySelector(".js-prev");
let resultStats = document.querySelector(".js-result-stats");
const spinner = document.querySelector(".js-spinner");
let totalResults;
let currentPage = 1;
let searchQuery;

const apiKey = "sYoUMawzOY5bv-nXDaU-zLmM1Hb6LVW2Xv_B2epudkU";
nextBtn.addEventListener("click", () => {
  currentPage += 1;
  fetchResults(searchQuery);
});

prevBtn.addEventListener("click", () => {
  currentPage -= 1;
  fetchResults(searchQuery);
});

function pagination(totalPages) {
  nextBtn.classList.remove("hidden");
  if (currentPage >= totalPages) {
    nextBtn.classList.add("hidden");
  }

  prevBtn.classList.add("hidden");
  if (currentPage !== 1) {
    prevBtn.classList.remove("hidden");
  }
}

async function fetchResults(searchQuery) {
  spinner.classList.remove("hidden");
  try {
    const results = await searchUnsplash(searchQuery);
    pagination(results.total_pages);
    console.log(results);
    displayResults(results);
  } catch (err) {
    console.log(err);
    alert("Failed to search Unsplash");
  }
  spinner.classList.add("hidden");
}

function handleSubmit(event) {
  event.preventDefault();
  currentPage = 1;
  const inputValue = document.querySelector(".js-search-input").value;
  searchQuery = inputValue.trim();
  console.log(searchQuery);
  fetchResults(searchQuery);
}

async function searchUnsplash(searchQuery) {
  const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=10&page=${currentPage}&client_id=${apiKey}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw Error(res.statusText);
  }
  const json = await res.json();
  return json;
}

function displayResults(json) {
  const searchResults = document.querySelector(".search-results");
  searchResults.textContent = "";
  json.results.forEach((result) => {
    const url = result.urls.regular;
    const unsplashLink = result.links.html;
    const photographer = result.user.name;
    const photographerPage = result.user.links.html;

    searchResults.insertAdjacentHTML(
      "beforeend",
      `<div>
        <a href="#" target="_blank">
          <div class="result-item" style="background-image: url(${url});"></div>
        </a>
        <p class="photographer-name">
          <a href="photographer.html" target="_blank" style="color: black; text-decoration: none;">Photo by ${photographer}</a>
        </p>
      </div>`
    );
  });
  totalResults = json.total;
  resultStats.textContent = `About ${totalResults} results found`;
}

openResult();
window.open(result.html);
