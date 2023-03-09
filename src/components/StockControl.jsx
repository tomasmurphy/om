import { useEffect, useState } from "react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

import { dataBase } from "../firebaseConfig";

const StockControl = ({ id }) => {
  const [formData, setFormData] = useState({ stock: 0, isUpdating: false });
  const [success, setSuccess] = useState(false);

  const { stock, isUpdating } = formData;

  useEffect(() => {
    const getProductById = async (id) => {
      const product = await getDoc(doc(dataBase, "items", id));
      if (product.exists()) {
        setFormData({ ...formData, stock: product.data().stock });
      } else {
        console.log("El producto no existe");
      }
    };

    getProductById(id);
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const product = doc(dataBase, "items", id);
    const data = { stock };

    await updateDoc(product, data);

    setSuccess(true);
    setFormData({ ...formData, isUpdating: false });
  };

  const handleIncrement = () => {
    setFormData({ ...formData, stock: stock + 1, isUpdating: true });
  };

  const handleDecrement = () => {
    setFormData({ ...formData, stock: stock - 1, isUpdating: true });
  };

  return (
    <>
      <form onSubmit={handleUpdate} className="row">
        <div className="input-group">
          <button
            className="btnCant"
            type="button"
            onClick={handleDecrement}
            disabled={isUpdating}
          >
            -
          </button>
          <input
            type="number"
            className="inputStock"
            value={stock}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: parseInt(e.target.value),
                isUpdating: true,
              })
            }
          />
          <button
            className="btnCant"
            type="button"
            onClick={handleIncrement}
            disabled={isUpdating}
          >
            +
          </button>
          {isUpdating ? (
            <button className="btnCant" type="submit">
              <i style={{ color: "red" }} className=" bi bi-check-square-fill"></i>
            </button>
          ) : null}
        </div>
      </form>
      {success && (
        <div className="alert alert-success" role="alert">
          ¡Actualizado! Si obse, ya lo actualicé
        </div>
      )}
    </>
  );
};

export default StockControl;
