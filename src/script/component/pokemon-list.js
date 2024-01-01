import "./pokemon-item.js";

class PokemonList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set pokemons(pokemons) {
    this._pokemons = pokemons;
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  handleDetail(e) {
    localStorage.setItem("detail", e);
    this._clickEvent();
  }

  renderError(message) {
    this.shadowDOM.innerHTML = `
    <style>
    .placeholder {
      font-weight: lighter;
      color: rgba(0,0,0,0.5);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  </style>`;
    this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  }

  renderLoading() {
    this.shadowDOM.innerHTML = `
    <style>
    .placeholder {
      font-weight: lighter;
      color: rgba(0,0,0,0.5);
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

  </style>`;
    this.shadowDOM.innerHTML += `<h2 class="placeholder">Loading ...</h2>`;
  }

  render() {
    this.shadowDOM.innerHTML = "";
    if (this._pokemons) {
      this._pokemons.forEach((pokemon) => {
        const pokemonItemElement = document.createElement("pokemon-item");
        pokemonItemElement.pokemon = pokemon;
        pokemonItemElement.setAttribute("id", `pokemon-${pokemon.name}`);
        this.shadowDOM.appendChild(pokemonItemElement);
        this.shadowDOM
          .querySelector(`#pokemon-${pokemon.name}`)
          .addEventListener("click", () => this.handleDetail(pokemon.url));
      });
    }
  }
}

customElements.define("pokemon-list", PokemonList);
