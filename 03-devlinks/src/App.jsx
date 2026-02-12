import './App.css'
import Perfil from './components/Perfil/Perfil'

function App() {
  return (
    <div id='App'>
      <div className='Perfil'>
        <img src="https://placehold.co/200x200" alt="" />
        <p>@Seu Nome</p>
      </div>
      <div className='switch'>botão switch</div>
      <div className='Links'></div>
      <div className='socialLinks'></div>
      <div className='rodape'></div>
    </div>
  )
}

export default App
