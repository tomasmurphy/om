import React, { useEffect, useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import { getItems } from "./apiCrudRealTime";

const SelectCategoria = ({ categoria, cargarCategoria }) => {
  const [categorias, setCategorias] = useState([]);
  const [value, setValue] = useState(categoria);

  const cargarCategoriaMemoized = useCallback(cargarCategoria, [cargarCategoria]);
 
  useEffect(() => {
    const fetchData = async () => {
      const items = await getItems();
      const categorias = items.filter(item => item.hasOwnProperty("categoria"));
      setCategorias(categorias);
    };
    fetchData();
  }, []);


  useEffect(() => {
    cargarCategoriaMemoized(value);
  }, [value, cargarCategoriaMemoized]);

  const handleCategoriaChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Form.Select
        id="select"
        value={value}
        onChange={handleCategoriaChange}
        aria-label="Default select"
      >
        {categorias.map((cat) => (
          <option value={cat.categoria} key={cat.id}>
            {cat.categoria}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default SelectCategoria;
