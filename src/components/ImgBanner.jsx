import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { updateItem, getItems } from "./apiCrudRealTime";

const ImgBanner = ({ nombre }) => {
  const [imagenes, setImagenes] = useState();

  useEffect(() => {
    const fetchImagenes = async () => {
      const items = await getItems();
      const filteredItems = items.filter((item) => item.nombre === nombre);
      setImagenes(filteredItems);
    };
    fetchImagenes();
  }, [nombre]);

  const subirImagenes = async (img, borrar) => {
    if (borrar === 1) {
      await updateItem(imagenes[0].id, { datos: { name: "", url: "" } });
      const updatedImagenes = await getItems();
      setImagenes(updatedImagenes.filter((item) => item.nombre === nombre));
    } else {
      await updateItem(imagenes[0].id, { datos: img });
      const updatedImagenes = await getItems();
      setImagenes(updatedImagenes.filter((item) => item.nombre === nombre));
    }
  };

  return (
    <>
      <div className="container-fluid">
        <p>{nombre}</p>
        {imagenes !== undefined && (
          <ImageUpload
            updateFile={imagenes[0].datos}
            subirImagenes={subirImagenes}
            size={nombre === "desktop" ? 3000 : 900}
          />
        )}
      </div>
    </>
  );
};

export default ImgBanner;
