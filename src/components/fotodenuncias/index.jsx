import { traerFotodenuncias } from "../../querys/scripts";
import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation, Link } from "react-router";
import "./style.css";

const Fotodenuncias = () => {
  const [fotodenuncias, setFotodenuncias] = useState([]);
  const [fdFiltradas, setFdFiltradas] = useState([]);
  const [mostrarSoloNoLeidas, setMostrarSoloNoLeidas] = useState(false);
  const [error, setError] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const ITEMS_POR_PAGINA = 30;
  const checkeo = location.pathname.endsWith("check-denuncia");

  useEffect(() => {
    let selectToken = localStorage.getItem("token") || "";
    if (selectToken) {
      setToken(selectToken);
    }
    async function cargarFotodenuncias() {
      let data = await traerFotodenuncias();
      if (data.error === 1) {
        setError(data.msg);
        return;
      }
      setFotodenuncias(data.fotodenuncias);
    }
    cargarFotodenuncias();
  }, []);

  useEffect(() => {
    const filtradas = mostrarSoloNoLeidas
      ? fotodenuncias.filter((e) => e.estado !== 1)
      : fotodenuncias;
    setFdFiltradas(filtradas);
    setPaginaActual(1); // Reset a la primera página si cambia el filtro
  }, [fotodenuncias, mostrarSoloNoLeidas]);

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const checkFiltro = (e) => {
    setMostrarSoloNoLeidas(e.target.checked);
  };

  const handleRowClick = (denuncia) => {
    navigate("/fotodenuncias/check-denuncia", {
      state: { ...denuncia },
    });
  };

  // Calcular paginación
  const totalPaginas = Math.ceil(fdFiltradas.length / ITEMS_POR_PAGINA);
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const paginadas = fdFiltradas.slice(inicio, inicio + ITEMS_POR_PAGINA);

  return (
    <>
      {checkeo ? (
        <Outlet />
      ) : (
        <>
          <Link to="/inicio" className="admin-back-link">
            Volver
          </Link>
          <div className="tabla-contenedor">
            <label htmlFor="filtroLeido">
              <input
                type="checkbox"
                name="filtroLeido"
                id="filtroLeido"
                onChange={checkFiltro}
                checked={mostrarSoloNoLeidas}
              />
              Sin leer
            </label>
            <table className="tabla-fotodenuncias">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {paginadas.length > 0 ? (
                  paginadas.map((elem) => (
                    <tr
                      key={elem.ID}
                      onClick={() => handleRowClick(elem)}
                      className="tabla-fila-clickeable"
                    >
                      <td>{elem.ID}</td>
                      <td>{elem.Usuario}</td>
                      <td>{elem.estado !== 1 ? "Sin Leer" : "Leida"}</td>
                      <td>{formatFecha(elem.Fecha)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center", padding: "1rem" }}
                    >
                      {error || "No hay datos para mostrar"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalPaginas > 1 && (
              <div className="paginacion">
                <button
                  onClick={() =>
                    setPaginaActual((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={paginaActual === 1}
                >
                  ← Anterior
                </button>
                <span>
                  Página {paginaActual} de {totalPaginas}
                </span>
                <button
                  onClick={() =>
                    setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
                  }
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export { Fotodenuncias };
