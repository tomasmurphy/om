import { useCallback, useState, useRef } from "react";
import { storage } from "../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

function ImageUpload({ subirImagenes, updateFile, size = 900 }) {
  const [fileName, setFileName] = useState(updateFile ? updateFile.name : "");
  const [url, setUrl] = useState(updateFile ? updateFile.url : "");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFile = useCallback((event) => handleUpload(event.target.files[0]), [subirImagenes, fileName]);

  const handleUpload = async (file) => {
    let codigo = Math.floor(Math.random() * 10000);
    const storageRef = ref(storage, `/files/${codigo}${file.name}`);

    // Reducir tamaño de imagen
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = size;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const uploadTask = uploadBytesResumable(storageRef, blob);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (err) => console.log(err),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setUrl(url);
                const uploadedFileName = uploadTask.snapshot.ref.name;
                setFileName(uploadedFileName); // Actualizar fileName con el nombre de archivo cargado
                subirImagenes({ name: uploadedFileName, url: url }, false); // Utilizar el nombre de archivo cargado en lugar de fileName
              });
            }
          );
          setIsLoading(true);
          uploadTask.then(() => {
            setIsLoading(false); // Establecer isLoading a false después de la carga
          });
        }, 'image/jpeg', 1);
      }
    }
  };
  
  const borrarImagen = () => {
    console.log(fileName)
    if (!fileName) return;
    subirImagenes(fileName, 1);
    const storageRef = ref(storage, `/files/${fileName}`);
    deleteObject(storageRef)
      .then(() => {
        console.log(`Se borró la imagen ${fileName}`);
        setFileName("");
        setUrl("");
      })
      .catch((error) => {
        subirImagenes(fileName, 1);
        setFileName("");
        setUrl("");
        console.log(`Error al borrar la imagen ${fileName}:`, error);
      });
  };

  const fileInputRef = useRef();
  return (
    <>
      {url ? (
        <>
          <img src={url} width="100" alt={fileName} />
          <i
            onClick={borrarImagen}
            className=" btn bi bi-trash3"
          ></i>
        </>
      ) : (
        <>
          <button
            className="custom-file-upload fs-1 btn"
            onClick={() => fileInputRef.current.click()}
          >
            {isLoading ? <div className="fs-6">cargando...</div> : <i className="bi bi-sunglasses"></i>}
            <input
              className="d-none"
              ref={fileInputRef}
              type="file"
              onChange={handleFile}
            />
          </button>
        </>
      )}
    </>
  );
}

export default ImageUpload;