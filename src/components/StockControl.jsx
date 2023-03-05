import { useEffect, useState } from "react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";

const StockControl = ({ id }) => {
  const [stock, setStock] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const update = async (e) => {
    e.preventDefault();
    setIsUpdating(false);
    const product = doc(dataBase, "items", id);
    const data = {
      stock,
    };
    await updateDoc(product, data);
    // setIsUpdating(false);
  };

  useEffect(() => {
    const getProductById = async (id) => {
      const product = await getDoc(doc(dataBase, "items", id));
      if (product.exists()) {
        setStock(product.data().stock);
      } else {
        console.log("El producto no existe");
      }
    };

    getProductById(id);
  }, [id]);

  return (
    <>
      <form onSubmit={update} className="row">
        <div className="input-group">
          <button
            type="button"
            className="btnCant"
            onClick={() => setStock(stock - 1, setIsUpdating(true))}
          >
            -
          </button>
          <input
            type="number"
            className="inputStock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value, setIsUpdating(true)))}
          />
          <button
            type="button"
            className="btnCant"
            onClick={() => setStock(stock + 1, setIsUpdating(true))}
          >
            +
          </button>
          <button 
          className="btnCant" type="submit">
            {isUpdating ?<i style={{
            color: "red",
          }} className=" bi bi-check-square-fill"></i>
            :<i style={{
              color: "green",
            }} className=" bi bi-check-square-fill"></i>}
          </button>
        </div>
      </form>
    </>
  );
};

export default StockControl;
