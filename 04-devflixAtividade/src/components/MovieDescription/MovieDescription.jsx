import { useCallback, useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState(props.initialMovie || {});
  const [plotTranslated, setPlotTranslated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const translateApiUrl =
    import.meta.env.VITE_TRANSLATE_API_URL ||
    "https://translate.argosopentech.com/translate";
  const translationCacheKey = "devflix_translation_cache_v1";
  const detailsCacheKey = "devflix_movie_details_cache_v1";
  const isPt = props.language !== "en";

  const t = {
    watch: isPt ? "▶️ Assistir" : "▶️ Watch",
    loading: isPt ? "Carregando informações..." : "Loading information...",
    error: isPt
      ? "Não foi possível carregar este filme agora."
      : "Could not load this movie right now.",
    rating: isPt ? "Avaliação" : "Rating",
    duration: isPt ? "Duração" : "Duration",
    cast: isPt ? "Elenco" : "Cast",
    genre: isPt ? "Gênero" : "Genre",
    director: isPt ? "Direção" : "Director",
    originalLanguage: isPt ? "Idioma original" : "Original language",
    plot: isPt ? "Sinopse" : "Plot",
    switchTitle: isPt ? "Mudar para inglês" : "Switch to Portuguese",
    switchLabel: isPt ? "ENG" : "PT",
  };

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

  const getDetailsFromCache = (key) => {
    try {
      const raw = localStorage.getItem(detailsCacheKey);
      const cache = raw ? JSON.parse(raw) : {};
      return cache[key] || null;
    } catch {
      return null;
    }
  };

  const saveDetailsToCache = (key, value) => {
    try {
      const raw = localStorage.getItem(detailsCacheKey);
      const cache = raw ? JSON.parse(raw) : {};
      cache[key] = value;
      localStorage.setItem(detailsCacheKey, JSON.stringify(cache));
    } catch {
      // ignora erro de cache
    }
  };

  const translateText = useCallback(
    async (text) => {
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
    },
    [translateApiUrl],
  );

  useEffect(() => {
    let cancelled = false;

    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        setPlotTranslated("");

        const cachedMovieDetails = getDetailsFromCache(props.movieID);
        if (cachedMovieDetails) {
          setMovieDesc(cachedMovieDetails);
          setIsLoading(false);

          if (props.language === "pt" && cachedMovieDetails.Plot) {
            const cacheId = `plot:${cachedMovieDetails.imdbID || props.movieID}:pt`;
            const cachedTranslation = getFromCache(cacheId);
            if (cachedTranslation) {
              setPlotTranslated(cachedTranslation);
            }
          }
          return;
        }

        const response = await fetch(`${props.apiUrl}&i=${props.movieID}`);
        const data = await response.json();
        if (cancelled) return;

        if (data?.Response === "False") {
          setHasError(true);
          setMovieDesc([]);
          return;
        }

        setMovieDesc(data);
        saveDetailsToCache(props.movieID, data);

        if (!isPt) {
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
        if (!cancelled) setHasError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchMovieData();

    return () => {
      cancelled = true;
    };
  }, [props.movieID, props.apiUrl, props.language, isPt, translateText]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        props.click();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [props]);

  return (
    <div
      className={`${styles.modalBackdrop} ${props.isClosing ? styles.fadeOut : ""}`}
      onClick={props.click}
    >
      <div
        className={`${styles.movieModal} ${props.isClosing ? styles.fadeOut : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button
            className={styles.languageToggle}
            onClick={props.onToggleLanguage}
            title={t.switchTitle}
          >
            {t.switchLabel}
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
                {t.watch}
              </a>
            </div>
          </div>
        </div>

        {isLoading && <p className={styles.feedback}>{t.loading}</p>}

        {hasError && <p className={styles.feedback}>{t.error}</p>}

        {!hasError && movieDesc?.Title && (
          <>
            <div className={styles.containerMisc}>
              <div className={styles.containerFlex}>
                {t.rating}: {movieDesc.imdbRating} | {t.duration}:{" "}
                {movieDesc.Runtime} | {movieDesc.Released}
              </div>
              <div className={styles.containerFlex}>
                <p>
                  {t.cast}: {movieDesc.Actors}
                </p>
                <p>
                  {t.genre}: {movieDesc.Genre}
                </p>
                <p>
                  {t.director}: {movieDesc.Director}
                </p>
                <p>
                  {t.originalLanguage}: {movieDesc.Language}
                </p>
              </div>
            </div>
            <div className={styles.desc}>
              <p>
                {t.plot}: {plotTranslated || movieDesc.Plot}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDescription;
