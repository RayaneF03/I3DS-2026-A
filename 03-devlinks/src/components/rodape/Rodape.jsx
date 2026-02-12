import React, { Children } from 'react'

const Rodape = ({Children}) => {
  return (
   <footer>
  <p>Feito com 🩵 por  <a href="https://github.com">{Children}</a> </p>
   </footer>
  )
}

export default Rodape
