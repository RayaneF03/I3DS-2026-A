import { Link } from "react-router";

const NaoEncontrado = () => {
  return (
    <div className="page">
      <h1>Página não encontrada</h1>
      <p>A rota informada não existe.</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
};

export default NaoEncontrado;
