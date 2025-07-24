import { useEffect, useState } from "react";
import "./style.css";
import { unbanearPersonajeGestion } from "../../../querys/scripts";

const UnbanearPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    numeroSoporte: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = await unbanearPersonajeGestion({
        nick: personaje.personaje,
        numeroSoporte: personaje.numeroSoporte,
      });
      if (data.error === 0) {
        setError(data.message);
        setPersonaje((prev) => ({
          ...prev,
          personaje: "",
          numeroSoporte: "",
        }));
        return;
      } else {
        setError(data.message);
        return;
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      return;
    }
  }

  return (
    <div className="banear-container">
      <form className="banear-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="banear-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="banear-input"
            value={personaje.personaje}
            onChange={(e) =>
              setPersonaje((prev) => ({ ...prev, personaje: e.target.value }))
            }
          />
        </label>

        <label htmlFor="numeroSoporte" className="banear-label">
          Numero Soporte
          <input
            type="number"
            name="numeroSoporte"
            id="numeroSoporte"
            className="banear-input"
            value={personaje.numeroSoporte}
            min={0}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                numeroSoporte: e.target.value,
              }))
            }
          />
        </label>
        {error && <p>{error}</p>}
        <button type="submit" className="banear-button">
          Unbanear
        </button>
      </form>
    </div>
  );
};

export { UnbanearPersonajeGestion };
