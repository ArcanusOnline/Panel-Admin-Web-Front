import { ingresarRolGm } from "../../../querys/scripts";
import "./style.css";
import { useEffect, useState } from "react";

const PanelGmEdit = () => {
  const [fields, setFields] = useState({
    usuario: "",
    privilegio: 0,
    desde: new Date().toISOString().slice(0, 19).replace("T", " "),
  });
  const [error, setError] = useState("");

  async function buscarUser(e) {
    e.preventDefault();
    let data = await ingresarRolGm(fields);
    setError(data.msg);
  }

  return (
    <div className="panel-gm-container">
      <form onSubmit={buscarUser} className="panel-gm-form">
        <label htmlFor="buscarUser" className="panel-gm-label">
          Buscar personaje
          <input
            type="text"
            id="buscarUser"
            name="buscarUser"
            className="panel-gm-input"
            onChange={(e) => {
              setFields((prev) => ({ ...prev, usuario: e.target.value }));
            }}
          />
        </label>

        <div className="privilegios-container">
          <label htmlFor="usuario" className="radio-label">
            <input
              type="radio"
              name="privilegio"
              id="usuario"
              value={0}
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  privilegio: e.target.value,
                }))
              }
            />
            Usuario
          </label>

          <label htmlFor="consejero" className="radio-label">
            <input
              type="radio"
              name="privilegio"
              id="consejero"
              value={1}
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  privilegio: e.target.value,
                }))
              }
            />
            Consejero
          </label>

          <label htmlFor="semidios" className="radio-label">
            <input
              type="radio"
              name="privilegio"
              id="semidios"
              value={2}
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  privilegio: e.target.value,
                }))
              }
            />
            Semi-Dios
          </label>

          <label htmlFor="dios" className="radio-label">
            <input
              type="radio"
              name="privilegio"
              id="dios"
              value={3}
              onChange={(e) =>
                setFields((prev) => ({
                  ...prev,
                  privilegio: e.target.value,
                }))
              }
            />
            Dios
          </label>
        </div>

        <button type="submit" className="panel-gm-button">
          Agregar
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
export { PanelGmEdit };
