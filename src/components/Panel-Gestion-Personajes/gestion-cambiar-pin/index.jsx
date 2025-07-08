import { useEffect, useState } from "react";
import "./style.css"

const CambiarPinPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    pinNueva: "",
    gm: localStorage.getItem("username") || "Administrador",
  });

  return (
    <div className="cambiar-pin-container">
      <form className="cambiar-pin-form">
        <label htmlFor="buscarPjGestion" className="cambiar-pin-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="cambiar-pin-input"
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
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                pinNueva: e.target.value,
              }))
            }
          />
        </label>

        <button type="submit" className="cambiar-pin-button">
          Cambiar PIN
        </button>
      </form>
    </div>
  );
};

export { CambiarPinPersonajeGestion };