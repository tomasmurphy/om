import { collection, addDoc } from 'firebase/firestore';
import { dataBase } from '../firebaseConfig';
import items from './items.json';



export const MyComponent = () => {
    const cargaMasivaProductos = (items) => {
        const ref = collection(dataBase, "items");
        items.map((prod) => {
          addDoc(ref, prod);
          return null
        });
        alert("termine")
      }
    
  return (
    <div>
      <button onClick={() => cargaMasivaProductos(items)}>Cargar productos</button>

    </div>
  )
}
