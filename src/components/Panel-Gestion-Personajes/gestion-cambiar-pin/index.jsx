import { useEffect, useState } from "react";
import "./style.css";
import { cambiarPinGestion } from "../../../querys/scripts";

const CambiarPinPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    pinNueva: "",
    numeroSoporte: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = await cambiarPinGestion({
        nick: personaje.personaje,
        pinNueva: personaje.pinNueva,
        numeroSoporte: personaje.numeroSoporte,
      });
      if (data.error === 0) {
        setError(data.message);
        setPersonaje((prev) => ({
          ...prev,
          personaje: "",
          pinNueva: "",
          numeroSoporte: "",
        }));
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError("Error al conectarse con el servidor");
    }
  }

  return (
    <div className="cambiar-pin-container">
      <form className="cambiar-pin-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="cambiar-pin-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="cambiar-pin-input"
            value={personaje.personaje}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        <label htmlFor="pinNueva" className="cambiar-pin-label">
          PIN nuevo
          <input
            type="text"
            name="pinNueva"
            id="pinNueva"
            className="cambiar-pin-input"
            value={personaje.pinNueva}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                pinNueva: e.target.value,
              }))
            }
          />
        </label>
        <label htmlFor="numeroSoporte" className="cambiar-pin-label">
          Numero de Soporte
          <input
            type="number"
            name="numeroSoporte"
            id="numeroSoporte"
            className="cambiar-pin-input"
            value={personaje.numeroSoporte}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                numeroSoporte: e.target.value,
              }))
            }
          />
        </label>
        {error && <p>{error}</p>}
        <button type="submit" className="cambiar-pin-button">
          Cambiar PIN
        </button>
      </form>
    </div>
  );
};

export { CambiarPinPersonajeGestion };
