class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      :host {
        display: block;
        width: 100%;
        background-color: #43766C;
        color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      }
      h2 {
        padding: 12px;
        font-size: 18px;
        letter-spacing: 6px;
        color: #CFAC2C;
        text-shadow: 2px 2px #3761A8;
      }
    </style>
      
      <h2>Pokémon</h2>
    `;
  }
}

customElements.define("app-bar", AppBar);
