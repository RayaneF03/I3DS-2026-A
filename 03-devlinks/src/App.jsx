import './App.css'
import Link from './components/Link/Link'
import Perfil from './components/Perfil/Perfil'
import Rodape from './components/rodape/Rodape'
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
      <div className="SocialLinks">
        <SocialLinks url={"https://github.com"} icon={"logo-github"}/>
        <SocialLinks url={"https://instagram.com"} icon={"logo-instagram"}/>
        <SocialLinks url={"https://youtube.com"} icon={"logo-youtube"}/>
        <SocialLinks url={"https://linkedin.com"} icon={"logo-linkedin"}/>
      </div>
      <Rodape>Ray</Rodape>
    </div>
  )
}

export default App
