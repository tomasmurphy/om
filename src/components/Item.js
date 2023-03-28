import React from 'react'
import { Link } from 'react-router-dom'
// import Anteojo from './Anteojo';

export const Item = (
  {
    id = "",
    titulo = '',
    imagenes = '',
    medidas = "",
    
  }

) => {
  const tituloId = titulo.replace(/_|#| |@|<>/g, "_");

  return (
    <div className="" key={id}>
      <Link to={`/detalle/${id}#${tituloId}`} className='link'>



        <div className="imgMedida">
          <img src={imagenes[0].url} alt={`Foto de ${titulo}`} className='img-fluid mx-0 px-0' />

          <div className="medida">medidas:{medidas.ancho}/{medidas.alto}/{medidas.patilla}</div>
          {/* <div class="medida"><Anteojo medidas={medidas}></Anteojo></div> */}
        </div>

      </Link>
    </div>)
}
