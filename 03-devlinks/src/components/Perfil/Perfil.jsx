import React from 'react';
import styles from "./perfil.module.css";

const Perfil = ({children, fotoPerfil}) => {
  return (
      <div Id={styles.Perfil}>
        <img src={fotoPerfil} alt="" />
        <p>@{children}</p>
      </div>
  )
}


export default Perfil
