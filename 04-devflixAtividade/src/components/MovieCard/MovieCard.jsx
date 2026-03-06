import { useEffect, useRef, useState } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "../MovieDescription/MovieDescription";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const openModal = () => {
    setIsClosing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 250);
  };

  return (
    <>
      <div className={styles.movie} onClick={openModal}>
        <div>
          <p>{props.Year}</p>
        </div>

        <div>
          <img src={props.Poster} alt={props.Title} />
        </div>

        <div>
          <span>{props.Type}</span>
          <h3>{props.Title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <MovieDescription
          apiUrl={props.apiUrl}
          movieID={props.imdbID}
          click={closeModal}
          language={props.language}
          onToggleLanguage={props.onToggleLanguage}
          isClosing={isClosing}
          initialMovie={{
            imdbID: props.imdbID,
            Title: props.Title,
            Year: props.Year,
            Poster: props.Poster,
            Type: props.Type,
          }}
        />
      )}
    </>
  );
};

export default MovieCard;
