import { useCallback, useState, useRef } from "react";
import { storage } from "../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

function ImageUpload({ subirImagenes, updateFile }) {
  const [file, setFile] = useState(updateFile);
  const [url, setUrl] = useState(updateFile.url);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = useCallback((event) => {
    setIsLoading(true)
    setFile(event.target.files[0]);
    
    handleUpload(event.target.files[0]);
  }, []);

  const handleUpload = async (file) => {
    let codigo = Math.floor(Math.random() * 10000);
    console.log(codigo);
    const storageRef = ref(storage, `/files/${file.name}${codigo}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          subirImagenes({ name: `${file.name}${codigo}`, url: url }, false);
        });
      }
    );
    try {
      await uploadTask; // Esperar a que se complete la carga
    } finally {
      setIsLoading(false); // Establecer isLoading a false después de la carga
    }
  };

  const borrarImagen = (img) => {
    subirImagenes(file.name, 1);
    const desertRef = ref(storage, `/files/${img}`);
    console.log(desertRef);
    deleteObject(desertRef)
      .then(() => {
        console.log("te borre");
        setUrl("");
      })
      .catch((error) => {
        subirImagenes(file.name, 1);
        setUrl("");
        console.log(error);
      });
  };
  const fileInputRef = useRef();

  return (
    <>
      {url ? (
        <>
          <img src={url} width="100" alt={file.name} />
          <i
            onClick={() => borrarImagen(file.name)}
            className=" btn bi bi-trash3"
          ></i>
        </>
      ) : (
        <>
      
          <button
            className="custom-file-upload fs-1 btn"
            onClick={() => fileInputRef.current.click()}
          >
      {isLoading? <div className="fs-6">cargando...</div> :<i className="bi bi-sunglasses"></i>}
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
