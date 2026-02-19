import { useState } from 'react'
import './App.css'
import Link from './components/Link/Link'
import Perfil from './components/Perfil/Perfil'
import Rodape from './components/rodape/Rodape'
import SocialLinks from './components/SocialLinks/SocialLinks'
import Switch from './components/Switch/Switch'
import Foto from './assets/Perfil.jpg'

function App() {
  const[isLight, setIsLight] = useState(true)

  const troca = () => {
    setIsLight(!isLight)
  };
  return (
    <div id="App" className={isLight ? "light" : ""}>
      <Perfil fotoPerfil={Foto}>Ray</Perfil>
      
      <Switch troca={troca} isLight={isLight}/>

          <div id="Link">
          <ul>
            <Link url={"https://www.instagram.com/"}>Instagram</Link>
            <Link url={"https://open.spotify.com/playlist/62XId14Iuxh6zDZ6M4ggjE"}>Minha Playlist</Link>
            <Link url={"https://mepagaumcafe.com.br/"}>Me pague um café</Link>
           <Link url={"https://www.sp.senai.br/curso/tecnico-em-desenvolvimento-de-sistemas/102655"}>Conheça o curso do DEV</Link>
          </ul>
          </div>  
      <div id="SocialLinks">
        <SocialLinks url={"https://github.com/RayaneF03"} icon={"logo-github"}/>
        <SocialLinks url={"https://www.instagram.com/"} icon={"logo-instagram"}/>
        <SocialLinks url={"https://www.youtube.com/@iukyuki1"} icon={"logo-youtube"}/>
        <SocialLinks url={"https://www.linkedin.com/in/rayane-fernanda-dos-santos-9a8740325/"} icon={"logo-linkedin"}/>
      </div>
      <Rodape>Ray</Rodape>
    </div>
  )
}

export default App

