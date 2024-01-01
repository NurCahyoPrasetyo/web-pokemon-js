import "../component/pokemon-list.js";
import "../component/pokemon-pagenation.js";
import "../component/pokemon-detail.js";
import DataSource from "../data/data-source.js";

const main = () => {
  const pokemonListElement = document.querySelector("pokemon-list");
  const pagenationElement = document.querySelector("pagenation-bar");
  const detailElement = document.querySelector("pokemon-detail");

  const updateLocalStorage = (prevUrl, nextUrl) => {
    localStorage.setItem("prev", prevUrl);
    localStorage.setItem("next", nextUrl);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onFetchView = async (url) => {
    try {
      let data;
      if (!url) {
        data = await DataSource.getPokemonList();
      } else {
        data = await DataSource.getPokemonCustomeUrl(url);
      }

      renderResult(data.results, "list");
      updateLocalStorage(data.previous, data.next);
      scrollToTop();
    } catch (message) {
      fallbackResult(message, "list");
    }
  };

  const onClickViewDetail = async () => {
    const url = localStorage.getItem("detail");
    if (url !== "null") {
      try {
        const data = await DataSource.getPokemonCustomeUrl(url);
        renderResult(data, "detail");
        detailElement.style.display = "block";
      } catch (message) {
        fallbackResult(message, "detail");
      }
    }
  };

  const onCloseModal = () => {
    detailElement.style.display = "none";
  };

  const onButtonPagenationPrev = async () => {
    const url = localStorage.getItem("prev");
    if (url !== "null") onFetchView(url);
  };

  const onButtonPagenationNext = async () => {
    const url = localStorage.getItem("next");
    if (url !== "null") onFetchView(url);
  };

  const renderResult = (results, type) => {
    if (type === "list") pokemonListElement.pokemons = results;
    if (type === "detail") detailElement.pokemonDetail = results;
  };

  const fallbackResult = (message, type) => {
    if (type === "list") pokemonListElement.renderError(message);
    if (type === "detail") pokemonListElement.renderError(message);
  };

  onFetchView();
  pokemonListElement.clickEvent = onClickViewDetail;
  pagenationElement.clickPrevEvent = onButtonPagenationPrev;
  pagenationElement.clickNextEvent = onButtonPagenationNext;
  detailElement.clickEvent = onCloseModal;
};

export default main;
