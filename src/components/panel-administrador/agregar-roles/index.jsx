import { agregarRoles, obtenerRangos } from "../../../querys/scripts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./style.css";

const AgregarRoles = () => {
  const descripcionesExcluidas = ["Administrador", "Panel Administrador"];
  const [roles, setRoles] = useState([]);
  const [fields, setFields] = useState({
    username: "",
    roles: [],
  });

  let navigate = useNavigate();

  useEffect(() => {
    async function cargarRoles() {
      let rangos = await obtenerRangos();
      setRoles(rangos);
    }
    cargarRoles();
  }, []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = await agregarRoles(fields.username, fields.roles);
      alert(data.msg);
      if (data.error === 0) {
        navigate("/inicio");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor")
    }
  }

  return (
    <div className="add-roles-container">
      <form className="add-roles-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="form-label">
          Cuenta:
        </label>
        <input
          type="text"
          id="username"
          className="form-input"
          placeholder="Nombre de cuenta"
          value={fields.username}
          onChange={(e) => {
            setFields((prev) => ({
              ...prev,
              username: e.target.value,
            }));
          }}
        />

        <div className="roles-list">
          {Array.isArray(roles) &&
            roles.map((elem, ind) => {
              if (!descripcionesExcluidas.includes(elem.Descripcion)) {
                return (
                  <div key={ind} className="role-item">
                    <input
                      type="checkbox"
                      id={`rol-${ind}`}
                      className="form-checkbox"
                      value={elem.Descripcion}
                      checked={fields.roles.includes(elem.Descripcion)}
                      onChange={(e) => {
                        setFields((prev) => {
                          const checked = e.target.checked;
                          const value = e.target.value;

                          return {
                            ...prev,
                            roles: checked
                              ? [...prev.roles, value]
                              : prev.roles.filter((role) => role !== value),
                          };
                        });
                      }}
                    />
                    <label htmlFor={`rol-${ind}`} className="checkbox-label">
                      {elem.Descripcion}
                    </label>
                  </div>
                );
              }
            })}
        </div>

        <input type="submit" className="btn-submit" value="Agregar" />
      </form>
    </div>
  );
};

export { AgregarRoles };
