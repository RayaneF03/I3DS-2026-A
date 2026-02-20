import styles from "./MovieDescription.module.css";

const MovieDescription = (props) => {
  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={() => ""}>
        <div className={styles.movieInfo}>Funcionou</div>
      </div>
    </div>
  );
};

export default MovieDescription;
