class PokemonDetail extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set pokemonDetail(pokemon) {
    this._pokemon = pokemon;
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
  }

  render() {
    console.log(this._pokemon);
    this.shadowDOM.innerHTML = `
        <style>
        .modal-content {
            background-color: #fefefe;
            border: 1px solid #888;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            border-radius: 14px;
            margin: 16vh auto;
        }

        .modal-close {
            border-radius: 12px;
            margin: 0;
            padding: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #43766C;
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            letter-spacing: 4px;
        }

        .modal-close > p {
            font: italic small-caps bold 24px/30px Georgia, serif;
            cursor: pointer; 
            margin: 0;
        }

        .pokemon-info{
            padding: 12px;
        }

        .list-fa-pokemon{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
            grid-gap: 12px;
            margin-bottom: 12px;
        }

        .list-fa-pokemon > img {
            cursor: pointer;
            transform: scale(1);
            transition: 0.3s ease-in-out;
        }

        .list-fa-pokemon > img:hover {
            transform: scale(1.4);
            transition: 0.3s ease-in-out;
        }

        p {
            font-family: 'Comic Neue', cursive;
            margin: 0;
        }

        span{
            padding: 0 4px;
            font-weight: bold;
        }
        </style>
    
        <div class="modal-content">
        <div class="modal-close">${this._pokemon.name} <p id="modal-close-icon">&#10005;</p></div>
          <div class="pokemon-info">
          <div class="list-fa-pokemon">
            <img class="fan-art-pokemon" src="${this._pokemon.sprites.front_default}" alt="${this._pokemon.name}">
            <img class="fan-art-pokemon" src="${this._pokemon.sprites.back_default}" alt="${this._pokemon.name}">
            <img class="fan-art-pokemon" src="${this._pokemon.sprites.front_shiny}" alt="${this._pokemon.name}">
            <img class="fan-art-pokemon" src="${this._pokemon.sprites.back_shiny}" alt="${this._pokemon.name}">
          </div>
            <p>Height: <strong>${this._pokemon.height}</strong> | Weight: <strong>${this._pokemon.weight}</strong></p>
            <p id="type">Type:</p>
            <p id="abilities">Abilities:</p>
          </div>
        </div>
        `;

    const typeElement = this.shadowDOM.querySelector("#type");
    this._pokemon.types.forEach((item) => {
      const typeItem = document.createElement("span");
      typeItem.textContent = `"${item.type.name}"`;
      typeElement.appendChild(typeItem);
    });

    const abilitiesElement = this.shadowDOM.querySelector("#abilities");
    this._pokemon.abilities.forEach((item) => {
      const abilitiesItem = document.createElement("span");
      abilitiesItem.textContent = `"${item.ability.name}"`;
      abilitiesElement.appendChild(abilitiesItem);
    });

    this.shadowDOM
      .querySelector("#modal-close-icon")
      .addEventListener("click", this._clickEvent);
  }
}

customElements.define("pokemon-detail", PokemonDetail);
