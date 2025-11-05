import { API_KEY, API_URL } from "./config.js";

const formSearch = document.querySelector("form");

formSearch.onsubmit = (e) => {
  e.preventDefault();

  const search = e.target.search.value.trim();

  if (search === "") {
    alert("Type the name of movie or serie");
    return;
  }

  async function searchMovie(search) {
    const loader = document.querySelector(".loader");
    const list = document.querySelector(".list");

    loader.classList.remove("hidden");
    list.innerHTML = "";

    try {
      const res = await fetch(
        `${API_URL}?s=${encodeURIComponent(search)}&apikey=${API_KEY}`
      );
      const data = await res.json();
      showData(data, search);
    } catch (error) {
      console.error(error);
      alert("Error fetching data. Try again later.");
    } finally {
      loader.classList.add("hidden");
    }
  }

  searchMovie(search);
};

const showData = (data, search) => {
  const list = document.querySelector("div.list");
  list.innerHTML = "";

 
  if (!data.Search) {
    alert(`No results for "${search}"`);
    return;
  }


  data.Search.forEach((element) => {
    const item = document.createElement("div");
    item.classList.add("item");

    item.innerHTML = `
      <img src="${
        element.Poster !== "N/A"
          ? element.Poster
          : "https://via.placeholder.com/300x450?text=No+Image"
      }" alt="${element.Title}" />
      <h2>${element.Title}</h2>
      <p class="year">${element.Year}</p>
      <p class="type">${element.Type}</p>
    `;

    list.appendChild(item);
  });
};
