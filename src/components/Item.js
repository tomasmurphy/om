import React from 'react'
import { Link } from 'react-router-dom'

export const Item = (
  {
    id = "",
    titulo = '',
    imagenes = '',
    precio = 0,
    formaPago = "",
    categoria = ""
  }

) => {
  const tituloId = titulo.replace(/_|#| |@|<>/g, "_");

  return (
    <div className="" key={id}>
      <Link to={`/detalle/${id}#${tituloId}`} className='link'>
        
        <img src={imagenes[0].url} alt={`Foto de ${titulo}`} className='img-fluid mx-0 px-0' />
        
      </Link>
    </div>)
}
