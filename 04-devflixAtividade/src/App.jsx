import { useCallback, useEffect, useState } from "react"; // useState - Ele controla o estado do item |
import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("pt");

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
      await searchMovies("Hulk"); // termo para pesquina ao carregar o site
    })();
  }, [searchMovies]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  const texts = {
    pt: {
      searchPlaceholder: "Pesquise por filmes",
      searchAlt: "Botão de ação para pesquisa!",
      notFound: "😢 Filme não encontrado 😢",
    },
    en: {
      searchPlaceholder: "Search for movies",
      searchAlt: "Search action button!",
      notFound: "😢 Movie not found 😢",
    },
  };

  const t = texts[language];

  return (
    <div id="App" className={theme}>
      <div className="top-controls">
        <button
          className="lang-top-btn"
          onClick={toggleLanguage}
          title={
            language === "pt" ? "Switch to English" : "Mudar para português"
          }
        >
          {language === "pt" ? "EN" : "PT"}
        </button>

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
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
          placeholder={t.searchPlaceholder}
        />
        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt={t.searchAlt}
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
        <h2 className="empty">{t.notFound}</h2>
      )}

      <Rodape link={"https://github.com/ProfCastello"}>ProfCastello</Rodape>
    </div>
  );
};

export default App;
