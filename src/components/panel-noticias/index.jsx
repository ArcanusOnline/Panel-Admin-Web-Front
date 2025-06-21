import "./style.css";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { obtenerNoticias, eliminarNoticiaPanel } from "../../querys/scripts";
import { checkRoles } from "../../utils/checkRoles";

const PanelNoticias = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const isAgregar = pathname.endsWith("agregar-noticia");
  const isEditarListado = pathname === "/noticias/editar-noticia";
  const isEditarPanel =
    pathname.startsWith("/noticias/editar-noticia/") &&
    pathname.split("/").length === 4;
  const isEliminar = pathname.endsWith("eliminar-noticia");
  const isListadoNoticias = pathname === "/noticias";

  const [noticias, setNoticias] = useState([]);
  const [error, setError] = useState("");
  const [notiSeleccionada, setNotiSeleccionada] = useState(null);

  useEffect(() => {
    let roles = checkRoles();
    if (!roles || !roles.includes(3)) {
      navigate("/inicio");
      return;
    }
    if (isListadoNoticias || isEditarListado || isEliminar) {
      async function getNoticias() {
        const data = await obtenerNoticias();
        if (typeof data === "string") {
          setError(data);
        } else {
          setNoticias(data);
        }
      }
      getNoticias();
    }
  }, [pathname]);

  async function eliminarNoticia(id) {
    const confirmar = window.confirm(
      "¿Estás seguro que deseas eliminar esta noticia?"
    );
    if (!confirmar) return;
    try {
      setNotiSeleccionada(id);
      const data = await eliminarNoticiaPanel(id);
      if (data.error === 0) {
        alert(data.msg);
        setNoticias((prev) => prev.filter((n) => n.id !== id));
        setNotiSeleccionada(null);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error al eliminar la noticia");
      alert("Error al enviar la noticia");
    }
  }

  return (
    <div className="panel-noticias-container">
      {isListadoNoticias && (
        <>
          <div className="panel-header">
            <Link to="/inicio" className="link-volver">
              ← Volver
            </Link>
            <h2 className="titulo-panel">Panel de noticias</h2>
          </div>
          <Link to="/noticias/agregar-noticia" className="btn-agregar-noticia">
            + Agregar noticia
          </Link>
          {noticias.length > 0 ? (
            noticias.map((elem) => (
              <div key={elem.id} className="noticia-item">
                <p className="titulo-noticia">{elem.titulo}</p>
                <NavLink
                  to={`/noticias/editar-noticia/${elem.id}`}
                  state={elem}
                  className="btn-editar"
                >
                  Editar noticia
                </NavLink>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarNoticia(elem.id)}
                  disabled={notiSeleccionada === elem.id}
                >
                  {notiSeleccionada === elem.id
                    ? "Eliminando..."
                    : "Eliminar noticia"}
                </button>
              </div>
            ))
          ) : (
            <p className="mensaje-error">
              {error || "No hay noticias disponibles."}
            </p>
          )}
        </>
      )}

      {isAgregar && <Outlet />}
      {isEditarListado && (
        <>
          <Link to="/noticias" className="link-volver">
            ← Volver
          </Link>
          {noticias.length > 0 ? (
            noticias.map((elem) => (
              <div key={elem.id} className="noticia-item">
                <p className="titulo-noticia">{elem.titulo}</p>
                <NavLink
                  to={`/noticias/editar-noticia/${elem.id}`}
                  state={elem}
                  className="btn-editar"
                >
                  Editar noticia
                </NavLink>
              </div>
            ))
          ) : (
            <p className="mensaje-error">
              {error || "No hay noticias disponibles"}
            </p>
          )}
        </>
      )}

      {isEditarPanel && <Outlet />}
      {isEliminar && (
        <>
          <Link to="/noticias" className="link-volver">
            ← Volver
          </Link>
          {noticias.length > 0 ? (
            noticias.map((elem) => (
              <div
                key={elem.id}
                className={`noticia-item ${
                  notiSeleccionada === elem.id ? "seleccionada" : ""
                }`}
              >
                <p className="titulo-noticia">{elem.titulo}</p>
                <button
                  onClick={() => eliminarNoticia(elem.id)}
                  className="btn-eliminar"
                  disabled={notiSeleccionada === elem.id}
                >
                  {notiSeleccionada === elem.id
                    ? "Eliminando..."
                    : "Eliminar noticia"}
                </button>
              </div>
            ))
          ) : (
            <p className="mensaje-error">
              {error || "No hay noticias disponibles"}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export { PanelNoticias };
