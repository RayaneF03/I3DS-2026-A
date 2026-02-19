import "./App.css";

import Rodape from "./assets/components/Rodape/Rodape";
import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

const App = () => {
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

      <Rodape link={"https://github.com/RayaneF03"}>Rayane</Rodape>
    </div>
  );
};

export default App;
