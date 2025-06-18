import { useEffect, useState } from "react";
import { checkUsername } from "../../../utils/checkUsernameToken";
import { eliminarRoles, obtenerRangosCuenta } from "../../../querys/scripts";
import { useNavigate } from "react-router";
import "./style.css";

const EliminarRoles = () => {
  const descripcionesExcluidas = ["Administrador", "Panel Administrador"];
  const [fields, setFields] = useState({
    username: "",
    roles: [],
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cargarRoles = async () => {
    const usuarioLogueado = await checkUsername();
    if (!usuarioLogueado) {
      navigate("/");
      return;
    }

    if (!fields.username.trim()) {
      setError("Debe ingresar un nombre de cuenta");
      return;
    }

    const rangos = await obtenerRangosCuenta(fields.username.trim());

    if (rangos.error === 1) {
      setError("La cuenta no existe");
      setRoles([]);
      return;
    }

    if (rangos.error === 2) {
      setError("No se encontraron rangos para esta cuenta");
      setRoles([]);
      return;
    }

    setError("");
    setRoles(rangos);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let data = await eliminarRoles(fields.username, fields.roles);
      alert(data.msg);
      if (data.error === 0) {
        navigate("/inicio");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor");
    }
  };

  return (
    <div className="remove-roles-container">
      <div className="remove-roles-form">
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
            const nuevoUsername = e.target.value;
            setFields({ username: nuevoUsername, roles: [] });
            setError("");
            setRoles([]);
          }}
        />
        <button type="button" className="btn-search" onClick={cargarRoles}>
          Buscar Roles
        </button>
        {error && <p className="error-msg">{error}</p>}
      </div>

      {roles.length > 0 && (
        <form onSubmit={handleSubmit} className="role-list-form">
          {roles.map((elem, ind) =>
            !descripcionesExcluidas.includes(elem.Descripcion) ? (
              <div key={ind} className="role-item">
                <input
                  type="checkbox"
                  id={`rol-${ind}`}
                  name="roles"
                  className="form-checkbox"
                  value={elem.Descripcion}
                  checked={fields.roles.includes(elem.Descripcion)}
                  onChange={(e) => {
                    setFields((prev) => {
                      const role = e.target.value;
                      const isChecked = e.target.checked;
                      return {
                        ...prev,
                        roles: isChecked
                          ? [...prev.roles, role]
                          : prev.roles.filter((r) => r !== role),
                      };
                    });
                  }}
                />
                <label htmlFor={`rol-${ind}`} className="checkbox-label">
                  {elem.Descripcion}
                </label>
              </div>
            ) : null
          )}
          <input
            type="submit"
            value="Eliminar roles seleccionados"
            className="btn-delete"
          />
        </form>
      )}
    </div>
  );
};

export { EliminarRoles };
