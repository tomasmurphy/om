import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const Editor = ({cargarDescripcion, descripcion}) => {
  const [value, setValue] = useState(descripcion);
  
  useEffect(() => {
    cargarDescripcion(value);
  }, [value, cargarDescripcion]);
  
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
