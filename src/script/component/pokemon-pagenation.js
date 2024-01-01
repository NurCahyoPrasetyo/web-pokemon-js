class PagenationBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickPrevEvent(event) {
    this._clickPrevEvent = event;
    this.render();
  }

  set clickNextEvent(event) {
    this._clickNextEvent = event;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
      .pagenation-container{
        position: relative;
        width: 120px;
        margin: auto;
        padding-bottom: 12px;
      }

      .prev, .next {
        cursor: pointer;
        height: 28px;
        overflow: hidden;
        position: absolute;
        width: 10px;
        top:4px;
      }

      .next {
        right:0;
      }

      .prev:before, .next:before {
        background-color: black;
        content: "";
        height: 28px;
        left: 5px;
        position: absolute;
        top: 0;
        transform: rotate(45deg);
        width: 28px;
      }

      .next:before {
        left: auto;
        right: 5px;
      }

      .prev:after, .next:after {
        background-color: white;
        content: "";
        height: 28px;
        left: 8px;
        position: absolute;
        top: 0;
        transform: rotate(45deg);
        width: 28px;
      }

      .next:after {
        left: auto;
        right: 8px;
      }
      </style>
      
      <div id="pagenation-container" class="pagenation-container">
        <div id="pagenationPrevElement" class="prev"></div>
        <div id="pagenationNextElement" class="next"></div>
      </div>
      `;

    this.shadowDOM
      .querySelector("#pagenationPrevElement")
      .addEventListener("click", this._clickPrevEvent);

    this.shadowDOM
      .querySelector("#pagenationNextElement")
      .addEventListener("click", this._clickNextEvent);
  }
}

customElements.define("pagenation-bar", PagenationBar);
