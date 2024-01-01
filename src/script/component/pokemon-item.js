class PokemonItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set pokemon(pokemon) {
    this._pokemon = pokemon;
    this.render();
  }

  render() {
    const url = this._pokemon.url;
    const segments = url.split("/");
    const pokemonId = segments[segments.length - 2];
    const imgPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    this.shadowDOM.innerHTML = `
      <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
  
          :host {
            display: block;
            margin-bottom: 18px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            overflow: hidden;
            background: #d8c9b7;
            cursor: pointer;
            transform: scale(.85);
            transition: 0.3s ease-in-out;
          }

          :host(:hover){
            background: #B19470;
            transform: scale(1.1);
            transition: 0.3s ease-in-out;
          }
          
          .fan-art-pokemon {
            width: auto;
            display: block;
            margin: auto;
          }
          
          .pokemon-info {
            padding: 12px 24px;
          }
          
          .pokemon-info > h2 {
            font-weight: lighter;
            text-align: center;
            color: #343a40;
            letter-spacing: 2px;
          }
          
        </style>
  
        <img class="fan-art-pokemon" src="${imgPokemon}" alt="${this._pokemon.name}">
        <div class="pokemon-info">
          <h2>${this._pokemon.name}</h2>
        </div>
      `;
  }
}

customElements.define("pokemon-item", PokemonItem);
