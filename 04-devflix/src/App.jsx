import "./App.css";
import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";

const App = () => {
  return (
    <div id="App">
      <img
        className="logo"
        src={logo}
        alt="Imagem do logo da Netflix com fundo preto e letras vermelhas, promovendo a plataforma de streaming de filmes e séries."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes e séries" />
        <img src={lupa} alt="Botão de ação de pesquisa" />
      </div>
      <rodape>Ray</rodape>
    </div>
  );
};

export default App;
