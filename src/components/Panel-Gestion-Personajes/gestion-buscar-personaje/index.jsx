import { useEffect, useState } from "react";
import "./style.css";
import React from "react";
import { traerInfoIndividual, chequeoPinPanel } from "../../../querys/scripts";
import { devolverExp } from "../../../assets/indiceExp";
import { calcularExp } from "../../../assets/calculadoraExp";
import { transcribirSkill } from "../../../assets/indicesSkill.js";

const BuscarPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
  });

  const [error, setError] = useState("");

  // Datos del personaje
  const [personajeInfo, setPersonajeInfo] = useState();
  const [tablaHechis, setTablaHechis] = useState();
  const [tablaObjBove, setTablaObjBove] = useState();
  const [tablaObjInven, setTablaObjInven] = useState();
  const [tablaDatos, setTablaDatos] = useState();
  const [penas, setPenas] = useState();
  const [baneos, setBaneos] = useState();
  const [skills, setSkills] = useState();
  const [errorPin, setErrorPin] = useState("");
  const [chequeoPin, setChequeoPin] = useState("");

  const oroFormatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  function enmascararPin(pin) {
    let nuevaPin = `${pin.slice(0, 3)}${"*".repeat(pin.length - 3)}`;
    return nuevaPin;
  }
  async function chequearPin(e) {
    try {
      e.preventDefault();
      let data = await chequeoPinPanel({
        pin: chequeoPin,
        pj: tablaDatos[0].NickB,
      });
      if (data.error === 0) {
        setErrorPin(`PIN Correcta`);
      } else {
        setErrorPin(`PIN Incorrecta`);
      }
    } catch (error) {
      setErrorPin("Error al conectar con el servidor");
      return;
    }
  }

  async function cargarInfo(e) {
    try {
      e.preventDefault();
      const data = await traerInfoIndividual(personaje.personaje);
      if (!data.hasOwnProperty("message")) {
        setPersonajeInfo(data);
        setTablaHechis(data.queryHechis);
        setTablaObjBove(data.queryOBoveda);
        setTablaObjInven(data.queryOInventario);
        setTablaDatos(data.queryStatsPersonaje);
        setSkills(data.queryInfoSkills);
        setPenas(
          typeof data.queryStatsPersonaje[0].PenasasB === "string"
            ? data.queryStatsPersonaje[0].PenasasB.split("-")
            : []
        );
        setBaneos(
          typeof data.queryStatsPersonaje[0].BanrazB === "string"
            ? data.queryStatsPersonaje[0].BanrazB.split("-")
            : []
        );
        setErrorPin("");
        setChequeoPin("");
      } else {
        setError(data.message);
        setPersonajeInfo();
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      return;
    }
  }

  // Hasta aca los datos

  return (
    <div>
      <div className="buscar-container">
        <form className="buscar-form" onSubmit={cargarInfo}>
          <label htmlFor="buscarPjGestion" className="buscar-label">
            Ingrese Personaje
            <input
              type="text"
              name="buscarPjGestion"
              id="buscarPjGestion"
              className="buscar-input"
              value={personaje.personaje}
              onChange={(e) => {
                setPersonaje((prev) => ({
                  ...prev,
                  personaje: e.target.value,
                }));
                setError("");
              }}
            />
          </label>

          {error && <p className="buscar-error">{error}</p>}

          <button type="submit" className="buscar-button">
            Buscar
          </button>
        </form>
      </div>
      {personajeInfo && Object.keys(personajeInfo).length > 0 && (
        <div className="containerInfoPersonajeCuenta">
          <table className="mmorpg-table">
            <thead>
              <tr>
                <th colSpan={3} className="tituloPersonajeCuenta">
                  {tablaDatos && tablaDatos[0]?.NickB}
                </th>
              </tr>
              <tr>
                <th>General</th>
                <th>Atributos</th>
                <th>Reputación</th>
              </tr>
            </thead>
            <tbody>
              {tablaDatos && Array.isArray(tablaDatos) ? (
                tablaDatos.map((elem, index) => (
                  <React.Fragment key={`personaje-${index}`}>
                    <tr className="mmorpg-card">
                      <td className="col-general">Nivel: {elem.ELVB}</td>
                      <td className="col-atributo">Fuerza: {elem.AT1}</td>
                      <td className="col-reputacion">
                        Asesino: {elem.AsesinoB}
                      </td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>
                        Exp:{" "}
                        {elem.ELVB >= 47
                          ? "Nivel Máximo"
                          : `${oroFormatter.format(
                              elem.EXPB
                            )}/${oroFormatter.format(
                              devolverExp(elem.ELVB)
                            )} [${calcularExp(elem.ELVB, elem.EXPB)}%]`}
                      </td>
                      <td className="col-atributo">Agilidad: {elem.AT2}</td>
                      <td className="col-reputacion">Noble: {elem.NoblesB}</td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td className="col-general">Clase: {elem.ClaseB}</td>
                      <td className="col-atributo">Inteligencia: {elem.AT3}</td>
                      <td className="col-reputacion">
                        Burguesía: {elem.BurguesiaB}
                      </td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td className="col-general">Raza: {elem.RazaB}</td>
                      <td className="col-atributo">Carisma: {elem.AT4}</td>
                      <td className="col-reputacion">
                        Bandido: {elem.BandidoB}
                      </td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td className="col-general">Género: {elem.GeneroB}</td>
                      <td className="col-atributo">Constitucion: {elem.AT5}</td>
                      <td className="col-reputacion">Plebe: {elem.PlebeB}</td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td className="col-general">
                        Mana: {elem.MinMANB} / {elem.MaxMANB}
                      </td>
                      <td className="col-atributo"></td>
                      <td className="col-reputacion">
                        Ladrón: {elem.LadronesB}
                      </td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>
                        Vida: {elem.MinHPB} / {elem.MaxHPB}
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>Ciudadanos Matados: {elem.CiudMatadosB}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>Criminales Matados: {elem.CrimMatadosB}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>Criaturas Matadas: {elem.NpcsMuertesB}</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>Estado: {elem.Online == 0 ? "Offline" : "Online"}</td>
                      <td>Bloqueado: {elem.Bloqueado == 0 ? "No" : "Si"}</td>
                      <td>Id Pj: {elem.ID}</td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>
                        Oro: {oroFormatter.format(elem.GLDB + elem.BANCOB)} (
                        {oroFormatter.format(elem.GLDB)} en billetera y{" "}
                        {oroFormatter.format(elem.BANCOB)} en banco)
                      </td>
                      <td>Id Cuenta: {elem.IDCuenta}</td>
                      <td>Mac: {elem.MacAddress}</td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>
                        Posición: Mapa: {elem.MapB} ({elem.XB}, {elem.YB})
                      </td>
                      <td>Email: {elem.EmailB}</td>
                      <td>Unban: {elem.Unban}</td>
                    </tr>
                    <tr className="mmorpg-card">
                      <td>
                        Última IP:{" "}
                        {[
                          (elem.LastIPB >> 24) & 255,
                          (elem.LastIPB >> 16) & 255,
                          (elem.LastIPB >> 8) & 255,
                          elem.LastIPB & 255,
                        ].join(".")}
                      </td>
                      <td>
                        <div>
                          PIN: {enmascararPin(elem.PIN)}
                          <form onSubmit={chequearPin}>
                            <input
                              type="text"
                              onChange={(e) => {
                                setChequeoPin(e.target.value);
                                setErrorPin("");
                              }}
                              name="checkPin"
                              id="checkPin"
                              value={chequeoPin}
                            />
                            <input type="submit" value="Chequear" />
                            {errorPin && <p className="errorPin">{errorPin}</p>}
                          </form>
                        </div>
                      </td>
                      <td>Cheat: {elem.VecesCheat}</td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No hay datos</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="infoClanPersonaje">
            <h3>Informacion de Clan</h3>
            <p className="datosClan">
              {tablaDatos?.[0] &&
                (tablaDatos[0].ClanFundado
                  ? `Fundó el clan ${tablaDatos[0].ClanFundado} y ${
                      tablaDatos[0].Nombre
                        ? `actualmente pertenece al clan ${tablaDatos[0].Nombre}`
                        : `actualmente no participa de ningún clan`
                    }`
                  : `No fundó ningún clan y ${
                      tablaDatos[0].Nombre
                        ? `actualmente pertenece al clan ${tablaDatos[0].Nombre}`
                        : `actualmente no participa de ningún clan`
                    }`)}
            </p>
          </div>

          <div>
            <h3>Faccion</h3>
            <p className="datosClan">
              {tablaDatos?.[0]
                ? tablaDatos[0].EjercitoCaosB === 0 &&
                  tablaDatos[0].EjercitoRealB === 0
                  ? "No pertenece a ninguna facción"
                  : tablaDatos[0].EjercitoCaosB === 1
                  ? "Pertenece a la Legión Oscura"
                  : "Pertenece a la Armada Real"
                : "Cargando datos..."}
            </p>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Penas</th>
                  <th>Historial de baneos</th>
                </tr>
              </thead>
              <tbody>
                {penas && penas.length > 1 ? (
                  penas.slice(1).map((pena, idx) => (
                    <tr key={`pena-${idx}`}>
                      <td>{pena}</td>
                      {idx === 0 && (
                        <td rowSpan={penas.length - 1}>
                          {baneos && baneos.length > 1 ? (
                            baneos
                              .slice(1)
                              .map((baneo, i) => (
                                <div key={`baneo-${i}`}>{baneo}</div>
                              ))
                          ) : (
                            <div>Nunca fue baneado</div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No posee penas</td>
                    <td>
                      {baneos && baneos.length > 1 ? (
                        baneos
                          .slice(1)
                          .map((baneo, i) => (
                            <div key={`baneo-${i}`}>{baneo}</div>
                          ))
                      ) : (
                        <div>Nunca fue baneado</div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="infoSkillPersonajes">
            <table className="mmorpg-table tabla-skills-contenedor">
              <thead>
                <tr>
                  <th colSpan={2}>Skills</th>
                </tr>
              </thead>
              <tbody>
                {skills && skills.length > 0 ? (
                  (() => {
                    const entries = Object.entries(skills[0]);
                    const chunks = [];
                    for (let i = 0; i < entries.length; i += 2) {
                      chunks.push(entries.slice(i, i + 2));
                    }

                    return chunks.map((pair, rowIndex) => (
                      <tr key={`skill-row-${rowIndex}`}>
                        {pair.map(([key, value], cellIndex) => (
                          <td key={`skill-${cellIndex}`}>
                            {transcribirSkill(key)}: {value}
                          </td>
                        ))}
                        {pair.length === 1 && <td></td>}
                      </tr>
                    ));
                  })()
                ) : (
                  <tr>
                    <td colSpan={2} className="no-data-cell">
                      No hay datos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="objetosInventarioPanel">
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>Inventario</th>
                </tr>
              </thead>
              <tbody>
                {tablaObjInven && tablaObjInven.length > 0 ? (
                  (() => {
                    // Filtramos los objetos vacíos
                    const objetosInventario = tablaObjInven.flatMap((elem) =>
                      // Verificamos si el objeto está vacío o no tiene valores útiles
                      Object.entries(elem)
                        .filter(([_, valor]) => valor && valor !== "")
                        .map(([_, valor]) => valor)
                    );

                    // Si la lista de objetos está vacía, mostramos el mensaje "No hay objetos en el inventario"
                    if (objetosInventario.length === 0) {
                      return (
                        <tr>
                          <td colSpan={2} className="no-data-cell">
                            No hay objetos en el inventario
                          </td>
                        </tr>
                      );
                    }

                    // Si hay objetos válidos, generamos las filas
                    const filas = [];
                    for (let i = 0; i < objetosInventario.length; i += 2) {
                      const primero = objetosInventario[i] || "";
                      const segundo = objetosInventario[i + 1] || "";

                      filas.push(
                        <tr key={`inventario-${i}`}>
                          {primero !== "" && <td>{primero}</td>}
                          {segundo !== "" && <td>{segundo}</td>}
                        </tr>
                      );
                    }

                    return filas;
                  })()
                ) : (
                  <tr>
                    <td colSpan={2} className="no-data-cell">
                      No hay objetos en el inventario
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="objetosInventarioPanel">
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>Boveda</th>
                </tr>
              </thead>
              <tbody>
                {tablaObjBove && tablaObjBove.length > 0 ? (
                  (() => {
                    // Filtramos los objetos vacíos
                    const objetosBoveda = tablaObjBove.flatMap((elem) =>
                      // Verificamos si el objeto está vacío o no tiene valores útiles
                      Object.entries(elem)
                        .filter(([_, valor]) => valor && valor !== "")
                        .map(([_, valor]) => valor)
                    );

                    // Si la lista de objetos está vacía, mostramos el mensaje "No hay objetos en el inventario"
                    if (objetosBoveda.length === 0) {
                      return (
                        <tr>
                          <td colSpan={2} className="no-data-cell">
                            No hay objetos en la boveda
                          </td>
                        </tr>
                      );
                    }

                    // Si hay objetos válidos, generamos las filas
                    const filas = [];
                    for (let i = 0; i < objetosBoveda.length; i += 2) {
                      const primero = objetosBoveda[i] || "";
                      const segundo = objetosBoveda[i + 1] || "";

                      filas.push(
                        <tr key={`boveda-${i}`}>
                          {primero !== "" && <td>{primero}</td>}
                          {segundo !== "" && <td>{segundo}</td>}
                        </tr>
                      );
                    }

                    return filas;
                  })()
                ) : (
                  <tr>
                    <td colSpan={2} className="no-data-cell">
                      No hay objetos en la boveda
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="objetosInventarioPanel">
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>Hechizos</th>
                </tr>
              </thead>
              <tbody>
                {tablaHechis && tablaHechis.length > 0 ? (
                  (() => {
                    // Filtra los hechizos que tienen valores no vacíos
                    const hechizos = Object.entries(tablaHechis[0]).filter(
                      ([_, valor]) => valor !== ""
                    );

                    // Si no hay hechizos válidos, muestra el mensaje de "No hay hechizos"
                    if (hechizos.length === 0) {
                      return (
                        <tr>
                          <td colSpan={2} className="no-data-cell">
                            No hay hechizos
                          </td>
                        </tr>
                      );
                    }

                    // Si hay hechizos, procesamos los valores
                    const filas = [];
                    for (let i = 0; i < hechizos.length; i += 2) {
                      const primero = hechizos[i] ? hechizos[i][1] : "";
                      const segundo = hechizos[i + 1] ? hechizos[i + 1][1] : "";

                      // Si ambos valores son vacíos, no creamos ninguna fila
                      if (primero === "" && segundo === "") continue;

                      // Generamos la fila solo si al menos uno de los valores no es vacío
                      const fila = (
                        <tr key={`hechizos-${i}`}>
                          {/* Solo creamos el td si el valor no es vacío */}
                          {primero && <td>{primero}</td>}
                          {segundo && <td>{segundo}</td>}
                        </tr>
                      );
                      filas.push(fila);
                    }

                    return filas;
                  })()
                ) : (
                  <tr>
                    <td colSpan={2} className="no-data-cell">
                      No hay hechizos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export { BuscarPersonajeGestion };
