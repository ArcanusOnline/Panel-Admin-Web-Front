import "./style.css";
import { traerLogs, traerFotodenunciasPorId } from "../../../querys/scripts";
import { useEffect, useState } from "react";

const PanelLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [datosFD, setDatosFD] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      let data = await traerLogs();
      if (data.error === 0) {
        setLogs(data.logs);
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

  return (
    <>
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
            {logs && Array.isArray(logs) ? (
              logs.map((elem, ind) => (
                <tr key={ind}>
                  <td
                    className="logs-cell clickable"
                    onClick={() => abrirModal(elem.IdFD)}
                  >
                    {elem.IdFD}
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
    </>
  );
};

export { PanelLogs };
