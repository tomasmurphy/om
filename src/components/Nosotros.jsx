import { useState, useEffect } from 'react';
import {  ref, onValue } from 'firebase/database';
import { dataBaseRealTime } from "../firebaseConfig";

function Nosotros() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Escucha cambios en la base de datos
    const dbRef = ref(dataBaseRealTime, 'datos');
    onValue(dbRef, (snapshot) => {
      const dataArr = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        dataArr.push(childData);
      });
      setData(dataArr);
    });
  }, []);
  console.log(data)
  return (
    <div>
      <h2>Datos de Realtime Database:</h2>
      <ul>
        {data.map((item) => (
          <li>{item.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Nosotros;
