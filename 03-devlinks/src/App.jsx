import './App.css'
import Link from './components/Link/Link'
import Perfil from './components/Perfil/Perfil'
import SocialLinks from './components/SocialLinks/SocialLinks'

function App() {
  return (
    <div id="App">
      <Perfil fotoPerfil={"https://placehold.co/100"}>Ray</Perfil>
      <div className="switch">botão switch</div>
      <ul>
            <Link url={""}>Instagram</Link>
            <Link url={""}>Minha Playlist</Link>
            <Link url={""}>Me pague um café</Link>
           <Link url={""}>Conheça o curso do DEV</Link>
      </ul>
      <div className="Links"></div>
      <div className="SocialLinks"></div>
      <div className="rodape"></div>
    </div>
  )
}

export default App
