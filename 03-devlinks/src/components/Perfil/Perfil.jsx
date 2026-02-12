import React from 'react'

const Perfil = ({children, fotoPerfil}) => {
  return (
      <div className='Perfil'>
        <img src={fotoPerfil} alt="" />
        <p>@{children}</p>
      </div>
  )
}

export default Perfil
