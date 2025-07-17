import { useEffect, useState } from "react";
import "./style.css";
import { cambiarPinGestion } from "../../../querys/scripts";

const CambiarPinPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    pinNueva: "",
    gm: localStorage.getItem("token"),
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = await cambiarPinGestion({
        nick: personaje.personaje,
        token: personaje.gm,
        pinNueva: personaje.pinNueva,
      });
      setError(data.message);
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
        {error && <p>{error}</p>}
        <button type="submit" className="cambiar-pin-button">
          Cambiar PIN
        </button>
      </form>
    </div>
  );
};

export { CambiarPinPersonajeGestion };
