import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownSubmenu } from "react-bootstrap-submenu";
import { NavLink, Link } from "react-router-dom";
import { getItems } from "./apiCrudRealTime";

function NavMenu() {
  const [categories, setCategories] = useState([]);

    useEffect(() => {
      getItems()
        .then((categorias) => {
          const filtro = categorias.filter((item) =>
            item.hasOwnProperty("categoria") &&
            item.categoria !== "redondos" &&
            item.categoria !== "cuadrados" &&
            item.categoria !== "lectura" &&
            item.categoria !== "eye cat" &&
            item.categoria !== "infantiles"
          );
  
          setCategories(filtro);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  return (
    <div className="navMenu">
      <div className="navbarContainer">
        <Dropdown className="d-inline">
          <Dropdown.Toggle as="div" className="mt-1" id="dropdown">
            <Link to="#">
              <div className="botonCatalogo">Catalogo</div>
            </Link>
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <DropdownSubmenu title="Promos"> 
              <Dropdown.Item as={NavLink} to="/categoria/redondos">
                Redondos
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/categoria/cuadrados">
                Cuadrados
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/categoria/eye cat">
                Eye cat
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/categoria/lectura">
                Lectura
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/categoria/infantiles">
                Infantiles
              </Dropdown.Item>
            </DropdownSubmenu>
            {categories.map((cat) => (
              <Dropdown.Item as="div" key={cat.id}>
                <NavLink to={`categoria/${cat.categoria}`} className="categoria">
                  {cat.categoria}
                </NavLink>
              </Dropdown.Item>
            ))}
             
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default NavMenu;
