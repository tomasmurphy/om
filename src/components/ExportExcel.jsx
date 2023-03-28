import ExcelJS from "exceljs";
import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";

const Test = () => {
  const [items, setItems] = useState([]);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [loadingJson, setLoadingJson] = useState(false);

  const loadProducts = async () => {
    const itemsCollection = collection(dataBase, "items");

    const items = await getDocs(itemsCollection);
    const productos = items.docs.map((doc) => {
      console.log("gaste una lectura desde el front");
      return { id: doc.id, ...doc.data() };
    });
    setItems(productos);
  };

  function handleDownloadExcel() {
    setLoadingExcel(true);
    loadProducts();
    const excelData = items.map((doc) => ({
      categoria: doc.categoria,
      titulo: doc.titulo,
      descripcion: doc.descripcion,
      proveedor: doc.proveedor,
      stock: doc.stock,
      estado: doc.estado,
      medidas: `${doc.medidas.ancho}/${doc.medidas.alto}/${doc.medidas.patilla}`,
    }));
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("react-export-table-to-excel");
    worksheet.columns = [
      { header: "Categoria", key: "categoria" },
      { header: "Titulo", key: "titulo" },
      { header: "Descripcion", key: "descripcion" },
      { header: "Proveedor", key: "proveedor" },
      { header: "Stock", key: "stock" },
      { header: "Estado", key: "estado" },
      { header: "Medidas", key: "medidas" },
    ];
    worksheet.addRows(excelData);
    const fileName = `recetados-optimarketok_${new Date().toLocaleDateString()}.xlsx`;
    workbook.xlsx.writeBuffer().then(async (buffer) => {
      try {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "Archivos de Excel",
              accept: {
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                  [".xlsx"],
              },
            },
          ],
        });

        if (fileHandle) {
          const writable = await fileHandle.createWritable();
          await writable.write(buffer);
          await writable.close();
        }
      } catch (error) {
        console.log(error);
      }
      setLoadingExcel(false);
    });
  }

  async function downloadJsonFile() {
    setLoadingJson(true);
    loadProducts();
    const jsonData = items.map((doc) => ({
      global: doc.global,
      categoria: doc.categoria,
      titulo: doc.titulo,
      descripcion: doc.descripcion,
      proveedor: doc.proveedor,
      stock: doc.stock,
      estado: doc.estado,
      medidas: doc.medidas,
      imagenes: doc.imagenes,
    }));
    const fileName = `db-optimarketok_${new Date().toLocaleDateString()}.json`;

    const json = JSON.stringify(jsonData);
    const blob = new Blob([json], { type: "application/json" });

    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: "Archivo JSON",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      });

      if (fileHandle) {
        // Verifica si el usuario no canceló la operación
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingJson(false);
  }

  return (
    <>
      <div className="boton" onClick={handleDownloadExcel} style={{backgroundColor: loadingExcel ? 'red' : ''}}>
        {loadingExcel ? "descargando..." : "Exportar excel"}
      </div>
      <div className="boton" onClick={downloadJsonFile} style={{backgroundColor: loadingJson ? 'red' : ''}}>
        {loadingJson ? "descargando..." : "Copia de seguridad"}
      </div>
    </>
  );
};
export default Test;
