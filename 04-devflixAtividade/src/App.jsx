import { useCallback, useEffect, useState } from "react"; // useState - Ele controla o estado do item |
import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("devflix_theme");
    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "dark";
  });
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("devflix_language");
    return savedLanguage === "pt" || savedLanguage === "en"
      ? savedLanguage
      : "pt";
  });

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  //Criando a conexão com a API e trazendo informações
  const searchMovies = useCallback(
    async (title) => {
      const response = await fetch(`${apiUrl}&s=${title}`);
      const data = await response.json();

      //Alimentando a variavel movies
      setMovies(data.Search);
    },
    [apiUrl],
  );

  useEffect(() => {
    (async () => {
      await searchMovies("Spider Man"); // termo para pesquina ao carregar o site
    })();
  }, [searchMovies]);

  useEffect(() => {
    localStorage.setItem("devflix_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("devflix_language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "pt" ? "en" : "pt"));
  };

  return (
    <div id="App" className={theme}>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <div className="logo-container">
        <img
          id="Logo"
          src={logo}
          alt="Logotipo do serviço de streaming Devflix, com letras vermelhas e fundo preto, promovendo conteúdo de séries, filmes e entretenimento online."
        />
      </div>

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Pesquise por filmes"
        />
        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt="Botão de ação para pesquisa!"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              {...movie}
              apiUrl={apiUrl}
              language={language}
              onToggleLanguage={toggleLanguage}
            />
          ))}
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Rodape link={"https://github.com/RayaneF03"}>RaY</Rodape>
    </div>
  );
};

export default App;
