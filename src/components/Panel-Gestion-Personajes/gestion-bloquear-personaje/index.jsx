import { useEffect, useState } from "react";
import "./style.css";
import { bloquearPersonaje } from "../../../querys/scripts";

const BloquearPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    ticket: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let bloquear = 1;
      let data = await bloquearPersonaje({
        usuario: personaje.personaje,
        status: bloquear,
        ticket: personaje.ticket,
      });
      if (data.error === 0) {
        setError("Personaje bloqueado correctamente");
        setPersonaje((prev) => ({
          ...prev,
          personaje: "",
          ticket: "",
        }));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      return;
    }
  }

  return (
    <div className="bloquear-container">
      <form className="bloquear-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="bloquear-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="bloquear-input"
            value={personaje.personaje}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>
        <label htmlFor="nroSoporte" className="banear-label">
          Numero de Soporte
          <input
            type="number"
            name="nroSoporte"
            id="nroSoporte"
            className="banear-input"
            value={personaje.ticket}
            min={0}
            onChange={(e) =>
              setPersonaje((prev) => ({ ...prev, ticket: e.target.value }))
            }
          />
        </label>
        {error && <p className="bloquear-error">{error}</p>}

        <button type="submit" className="bloquear-button">
          Bloquear
        </button>
      </form>
    </div>
  );
};

export { BloquearPersonajeGestion };
