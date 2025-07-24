import { useEffect, useState } from "react";
import "./style.css";
import {
  encarcelarPersonajeWebGestionOn,
  traerEstadoYPenas,
  encarcelarPersonajeOfflineGestion,
} from "../../../querys/scripts";

const PenarPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    motivo: "",
    tiempo: "",
    ticket: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let data = await traerEstadoYPenas(personaje.personaje);
      if (data.error === 0) {
        if (data.personaje[0].Online == 0) {
          let response = await encarcelarPersonajeOfflineGestion({
            personaje: personaje.personaje,
            pena: personaje.motivo,
            tiempo: personaje.tiempo,
            ticket: personaje.ticket,
          });
          if (response.error === 0) {
            setError(response.msg);
            setPersonaje((prev) => ({
              ...prev,
              personaje: "",
              motivo: "",
              tiempo: "",
              ticket: "",
            }));
          } else {
            setError(response.msg);
          }
        } else {
          let response = await encarcelarPersonajeWebGestionOn({
            nick: personaje.personaje,
            tiempo: personaje.tiempo,
            ticket: personaje.ticket,
            razon: personaje.motivo,
          });
          if (response.status === "ok") {
            setError(response.mensaje);
            setPersonaje((prev) => ({
              ...prev,
              personaje: "",
              motivo: "",
              tiempo: "",
              ticket: "",
            }));
          } else {
            setError(response.msg);
          }
        }
      } else {
        setError("No se encontro el personaje seleccionado");
      }
    } catch (error) {
      setError("Se perdio la conexion con el servidor");
      return;
    }
  }

  return (
    <div className="penar-container">
      <form className="penar-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="penar-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="penar-input"
            value={personaje.personaje}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        <label htmlFor="motivoPenaGestion" className="penar-label">
          Motivo de la pena
          <input
            type="text"
            name="motivoPenaGestion"
            id="motivoPenaGestion"
            className="penar-input"
            value={personaje.motivo}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                motivo: e.target.value,
              }))
            }
          />
        </label>

        <label htmlFor="tiempoPenaGestion" className="penar-label">
          Tiempo de cárcel (minutos)
          <input
            type="number"
            name="tiempoPenaGestion"
            id="tiempoPenaGestion"
            min={0}
            className="penar-input"
            value={personaje.tiempo}
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                tiempo: e.target.value,
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
        <button type="submit" className="penar-button">
          Penar
        </button>
      </form>
    </div>
  );
};

export { PenarPersonajeGestion };
