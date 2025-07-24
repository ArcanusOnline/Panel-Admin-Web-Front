import { useEffect, useState } from "react";
import "./style.css";
import { cambiarEmailGestion } from "../../../querys/scripts";

const CambiarEmailPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    emailNuevo: "",
    ticket: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = await cambiarEmailGestion({
        nick: personaje.personaje,
        ticket: personaje.ticket,
        email: personaje.emailNuevo,
      });
      if (data.error === 0) {
        setError(data.message);
        setPersonaje((prev) => ({
          ...prev,
          personaje: "",
          emailNuevo: "",
          ticket: "",
        }));
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError("Error al conectarse con el servidor");
    }
  }

  return (
    <div className="cambiar-email-container">
      <form className="cambiar-email-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="cambiar-email-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="cambiar-email-input"
            value={personaje.personaje}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        <label htmlFor="emailNuevo" className="cambiar-email-label">
          Email nuevo
          <input
            type="email"
            name="emailNuevo"
            id="emailNuevo"
            className="cambiar-email-input"
            value={personaje.emailNuevo}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                emailNuevo: e.target.value,
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
        {error && <p>{error}</p>}
        <button type="submit" className="cambiar-email-button">
          Cambiar Email
        </button>
      </form>
    </div>
  );
};

export { CambiarEmailPersonajeGestion };
