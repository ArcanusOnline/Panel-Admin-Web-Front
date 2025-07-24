import "./style.css";
import { traerLogs, traerFotodenunciasPorId } from "../../../querys/scripts";
import { useEffect, useState } from "react";

const PanelLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [datosFD, setDatosFD] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [logsOriginales, setLogsOriginales] = useState([]);

  const logsPorPagina = 20;

  useEffect(() => {
    async function cargarDatos() {
      let data = await traerLogs();
      if (data.error === 0) {
        setLogs(data.logs);
        setLogsOriginales(data.logs);
      } else {
        setError(data.msg);
      }
    }
    cargarDatos();
  }, []);

  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  const abrirModal = async (idFD) => {
    try {
      const data = await traerFotodenunciasPorId(idFD);
      setDatosFD(data);
      setModalAbierto(true);
    } catch (err) {
      console.error("Error al traer fotodenuncia:", err);
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setDatosFD(null);
  };

  // Cálculo del slice para mostrar solo los logs de la página actual
  const indiceUltimoLog = paginaActual * logsPorPagina;
  const indicePrimerLog = indiceUltimoLog - logsPorPagina;
  const logsMostrados = logs.slice(indicePrimerLog, indiceUltimoLog);

  const totalPaginas = Math.ceil(logs.length / logsPorPagina);

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handleAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  function filtrarLogs(value) {
    if (!value) {
      setLogs(logsOriginales);
      return;
    }

    const valueLower = value.toLowerCase();

    const logsFiltrados = logsOriginales.filter((elem) => {
      return (
        (elem.Usuario && elem.Usuario.toLowerCase().includes(valueLower)) ||
        (elem.NickB && elem.NickB.toLowerCase().includes(valueLower)) ||
        String(elem.IdFD).includes(value)
      );
    });

    setLogs(logsFiltrados);
  }

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            id="filtroGm"
            name="filtroGm"
            className="logs-input"
            placeholder="Buscar por GM, personaje o ID FD"
            onChange={(e) => filtrarLogs(e.target.value)}
          />
        </div>
        <div className="logs-container">
          <table className="logs-table">
            <thead>
              <tr className="logs-header">
                <th>ID FD</th>
                <th>GM</th>
                <th>Acción</th>
                <th>Usuario</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {logsMostrados && logsMostrados.length > 0 ? (
                logsMostrados.map((elem, ind) => (
                  <tr key={indicePrimerLog + ind}>
                    <td
                      className={`logs-cell ${
                        elem.IdFD !== null ? "clickable" : ""
                      }`}
                      onClick={() => {
                        if (elem.IdFD !== null) {
                          abrirModal(elem.IdFD);
                        }
                      }}
                    >
                      {elem.IdFD !== null ? elem.IdFD : "S/FD"}
                    </td>
                    <td className="logs-cell">{elem.Usuario}</td>
                    <td className="logs-cell">{elem.Accion}</td>
                    <td className="logs-cell">{elem.NickB || "-"}</td>
                    <td className="logs-cell">
                      {formatearFecha(elem.fecha) || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="logs-error">
                    {error || "No hay datos disponibles."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <div
            className="paginacion"
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            <button onClick={handleAnterior} disabled={paginaActual === 1}>
              Anterior
            </button>
            <span style={{ margin: "0 1rem" }}>
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={handleSiguiente}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        </div>

        {modalAbierto && datosFD && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Detalles de Fotodenuncia #{datosFD.fotodenuncias[0].ID}</h3>
              <p>
                <strong>Usuario:</strong> {datosFD.fotodenuncias[0].Usuario}
              </p>
              <p>
                <strong>Texto:</strong> {datosFD.fotodenuncias[0].Texto}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {formatearFecha(datosFD.fotodenuncias[0].Fecha)}
              </p>
              <button className="close-button" onClick={cerrarModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { PanelLogs };
