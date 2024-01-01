const axios = require("axios");

class DataSource {
  static getPokemonList() {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=18";
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .then((responseJson) => {
        if (responseJson) {
          return Promise.resolve(responseJson.data);
        } else {
          return Promise.reject(`API ${url},  is not found`);
        }
      });
  }

  static getPokemonCustomeUrl(url) {
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .then((responseJson) => {
        if (responseJson) {
          return Promise.resolve(responseJson.data);
        } else {
          return Promise.reject(`API ${url},  is not found`);
        }
      });
  }
}

export default DataSource;
