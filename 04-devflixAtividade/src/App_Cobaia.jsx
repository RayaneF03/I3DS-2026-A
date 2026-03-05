import { useState } from "react";
import "./App.css";

import Rodape from "./assets/components/Rodape/Rodape";
import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

const App = () => {
  const [filmes] = useState([
    {
      id: 1,
      titulo: "Série JavaScript",
      sinopse: "Aprenda JavaScript do zero",
      genero: "Educação",
      duracao: 120,
      imagem: "",
    },
    {
      id: 2,
      titulo: "React Avançado",
      sinopse: "Domine React em produção",
      genero: "Educação",
      duracao: 180,
      imagem: "",
    },
    {
      id: 3,
      titulo: "Web Design Moderno",
      sinopse: "Crie interfaces incríveis",
      genero: "Design",
      duracao: 90,
      imagem: "",
    },
  ]);

  return (
    <div id="App">
      <img
        id="Logo"
        src={logo}
        alt="Imagem do logo da Netflix com fundo preto e letras vermelhas, promovendo a plataforma de streaming de filmes e séries."
      />
      <>
        {filmes.map((filme, index) => (
          <div key={index}>
            <h2>{filme.titulo}</h2>
            <h3>{filme.duracao}</h3>
            <h4>{filme.sinopse}</h4>
            <br />
            <br />
          </div>
        ))}
      </>

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes e séries" />
        <img src={lupa} alt="Botão de ação de pesquisa" />
      </div>

      <Rodape link={"https://github.com/RayaneF03"}>Rayane</Rodape>
    </div>
  );
};

export default App;
