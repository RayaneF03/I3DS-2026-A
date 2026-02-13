import React from 'react'
import "./SocialLinks.module.css"

const SocialLinks = ({ url, icon }) => {
  return (
    <a href={url}><ion-icon name={icon}></ion-icon>
    </a>
  )
}

export default SocialLinks
