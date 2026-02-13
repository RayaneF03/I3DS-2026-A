import React from 'react'
const SocialLinks = ({ url, icon }) => {
  return (
    <a href={url}><ion-icon name={icon}></ion-icon>
    </a>
  )
}

export default SocialLinks
