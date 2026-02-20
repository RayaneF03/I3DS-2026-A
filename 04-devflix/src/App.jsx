import { useEffect, useState } from "react";
import "./App.css";

import Rodape from "./assets/components/Rodape/Rodape";
import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

const App = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  //Criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json;

    //Alimentando a variavel movies
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div id="App">
      <img
        id="Logo"
        src={logo}
        alt="Imagem do logo da Netflix com fundo preto e letras vermelhas, promovendo a plataforma de streaming de filmes e séries."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes e séries" />
        <img src={lupa} alt="Botão de ação de pesquisa" />
      </div>

      <div className="container">
        {movies.map}
      </div>

      <Rodape link={"https://github.com/RayaneF03"}>Rayane</Rodape>
    </div>
  );
};

export default App;
