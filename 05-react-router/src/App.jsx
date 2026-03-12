import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NaoEncontrado from "./pages/NaoEncontrado";
import Header from "./components/header/Header";
import Rodape from "./components/rodape/Rodape";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
      <Routes>
        {/* Identifica todas as rotas do sistema*/}
        <Route path="/Contato" element={<Contato />} />
        <Route path="/NaoEncontrado" element={<NaoEncontrado />} />
        <Route path="/" element={<Home />} />
        <Route path="/Sobre" element={<Sobre />} /> {/* uma rota do sistema*/}
      </Routes>
</div>

      <Rodape link={"https://github.com/RayaneF03"}>RayaneF03</Rodape>
      
    </>
  );
};

export default App;
