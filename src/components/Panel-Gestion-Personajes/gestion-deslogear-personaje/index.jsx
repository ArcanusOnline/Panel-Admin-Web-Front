import { useEffect, useState } from "react";
import "./style.css";
import { deslogearPersonajeGestion } from "../../../querys/scripts";

const DeslogearPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    gm: localStorage.getItem("token"),
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = await deslogearPersonajeGestion({
        nick: personaje.personaje,
        token: personaje.gm,
      });
      if (data.status === "ok") {
        setError(data.mensaje);
        setPersonaje((prev) => ({
          ...prev,
          personaje: "",
        }));
      } else {
        setError(data.msg);
      }
    } catch (error) {
      setError("Se perdio la conexion con el servidor");
      return;
    }
  }

  return (
    <div className="deslogear-container">
      <form className="deslogear-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="deslogear-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="deslogear-input"
            value={personaje.personaje}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        {error && <p className="deslogear-error">{error}</p>}

        <button type="submit" className="deslogear-button">
          Desloguear
        </button>
      </form>
    </div>
  );
};

export { DeslogearPersonajeGestion };
