import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [plotTranslated, setPlotTranslated] = useState("");
  const [dateTranslated, setDateTranslated] = useState("");

  const translateText = async (text) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt`,
      );
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error("Erro ao traduzir:", error);
      return text; // Retorna o texto original em caso de erro
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`${props.apiUrl}&i=${props.movieID}`);
        const data = await response.json();

        // Carrega os dados imediatamente
        setMovieDesc(data);

        // Se for português, buscar tradução em background
        if (props.language === "pt") {
          // Traduzir em background sem bloquear a exibição
          if (data.Plot && data.Plot !== "N/A") {
            translateText(data.Plot).then(setPlotTranslated);
          }
          if (data.Released && data.Released !== "N/A") {
            translateText(data.Released).then(setDateTranslated);
          }
        } else {
          // Se for inglês, resetar as traduções
          setPlotTranslated("");
          setDateTranslated("");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieData();
  }, [props.language]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/favicon.png" alt="" />
              {movieDesc.Type}
              <h1>{movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
              >
                ▶️ Assistir
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            Avaliação: {movieDesc.imdbRating} | Duração: {movieDesc.Runtime} |{" "}
            {dateTranslated || movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>Elenco: {movieDesc.Actors}</p>
            <p>Gênero: {movieDesc.Genre}</p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>Sinopse: {plotTranslated || movieDesc.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
