import React from 'react'
import { Item } from './Item'

export const ItemList = ({ items }) => {

   return (
      <>
         {
            items.map(item =>
               <div key={item.id} className='card col-6 col-md-3'>
               <Item
               
                  id={item.id}
                  imagenes={item.imagenes}
                  titulo={item.titulo}
                  medidas={item.medidas}
                  />
                  </div>
            )
         }
      </>
   )
};