import { Link } from "react-router";

const Contato = () => {
  return (
    <div className="page">
      <h1>Contato</h1>
      <p>Esta é a página de contato do projeto.</p>
      <p>E-mail: contato@devrouter.com</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
};

export default Contato;
