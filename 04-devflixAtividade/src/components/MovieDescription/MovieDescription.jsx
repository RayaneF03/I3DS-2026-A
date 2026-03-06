import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [plotTranslated, setPlotTranslated] = useState("");
  const translateApiUrl =
    import.meta.env.VITE_TRANSLATE_API_URL ||
    "https://translate.argosopentech.com/translate";
  const translationCacheKey = "devflix_translation_cache_v1";

  const getFromCache = (key) => {
    try {
      const raw = localStorage.getItem(translationCacheKey);
      const cache = raw ? JSON.parse(raw) : {};
      return cache[key] || "";
    } catch {
      return "";
    }
  };

  const saveToCache = (key, value) => {
    try {
      const raw = localStorage.getItem(translationCacheKey);
      const cache = raw ? JSON.parse(raw) : {};
      cache[key] = value;
      localStorage.setItem(translationCacheKey, JSON.stringify(cache));
    } catch {
      // ignora erro de cache
    }
  };

  const translateText = async (text) => {
    const normalizedText = (text || "").trim();
    if (!normalizedText) return "";

    // 1) Google endpoint público (sem chave)
    try {
      const googleResponse = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(normalizedText)}`,
      );

      if (googleResponse.ok) {
        const googleData = await googleResponse.json();
        const translatedByGoogle = googleData?.[0]
          ?.map((part) => part?.[0] || "")
          .join("")
          ?.trim();

        if (translatedByGoogle) {
          return translatedByGoogle;
        }
      }
    } catch {
      // tenta próximo provedor
    }

    // 2) LibreTranslate
    try {
      const response = await fetch(translateApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: normalizedText,
          source: "en",
          target: "pt",
          format: "text",
        }),
      });

      if (!response.ok) {
        throw new Error("Falha na tradução (LibreTranslate)");
      }

      const data = await response.json();
      if (data?.translatedText) {
        return data.translatedText;
      }

      throw new Error("Resposta inválida da API de tradução");
    } catch (error) {
      // 3) MyMemory (fallback)
      try {
        const fallbackResponse = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(normalizedText)}&langpair=en|pt`,
        );
        const fallbackData = await fallbackResponse.json();
        return fallbackData?.responseData?.translatedText || normalizedText;
      } catch {
        console.error("Erro ao traduzir:", error);
        return normalizedText;
      }
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchMovieData = async () => {
      try {
        setPlotTranslated("");
        const response = await fetch(`${props.apiUrl}&i=${props.movieID}`);
        const data = await response.json();
        if (cancelled) return;
        setMovieDesc(data);

        if (props.language === "en") {
          setPlotTranslated("");
          return;
        }

        // Traduz a sinopse automaticamente
        if (data.Plot && data.Plot !== "N/A") {
          const cacheId = `plot:${data.imdbID || props.movieID}:pt`;
          const cachedTranslation = getFromCache(cacheId);

          if (cachedTranslation) {
            setPlotTranslated(cachedTranslation);
            return;
          }

          const translated = await translateText(data.Plot);
          if (cancelled) return;
          setPlotTranslated(translated);
          if (translated && translated !== data.Plot) {
            saveToCache(cacheId, translated);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieData();

    return () => {
      cancelled = true;
    };
  }, [props.movieID, props.apiUrl, props.language]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button
            className={styles.languageToggle}
            onClick={props.onToggleLanguage}
            title={
              props.language === "pt"
                ? "Mudar para inglês"
                : "Switch to Portuguese"
            }
          >
            {props.language === "pt" ? "ENG" : "PT"}
          </button>

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
            {movieDesc.Released}
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
