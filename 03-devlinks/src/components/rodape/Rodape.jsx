import React from 'react'
import "./rodape.module.css"

const Rodape = ({children}) => {
  return (
   <footer>
  <p>Feito com 🩵 por  <a href="https://github.com/RayaneF03">{children}</a> </p>
   </footer>
  )
}

export default Rodape
