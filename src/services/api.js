import axios from "axios";

// Instance Axios configurée pour PokeAPI
const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
});

export default api;
