import { Link, Outlet, useLocation, useNavigate } from "react-router";
import "./style.css";
import { useEffect } from "react";
import { checkRoles } from "../../utils/checkRoles";

const PanelGestionPersonajes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const banear = location.pathname.endsWith("gestion-banear-personaje");
  const penar = location.pathname.endsWith("gestion-penar-personaje");
  const desloguear = location.pathname.endsWith("gestion-desloguear-personaje");
  const bloquear = location.pathname.endsWith("gestion-bloquear-personaje");
  const buscar = location.pathname.endsWith("gestion-buscar-personaje");
  const recuPass = location.pathname.endsWith("gestion-recuperar-pass-personaje");
  const cambiarEmail = location.pathname.endsWith("gestion-cambiar-email-personaje");
  const cambiarPin = location.pathname.endsWith("gestion-cambiar-pin-personaje");

  useEffect(() => {
    const roles = checkRoles();
    if (!roles || !roles.includes(5)) {
      navigate("/inicio");
    }
  }, []);

  return (
    <div className="panel-containers">
      <Link to="/inicio" className="admin-back-link">
        ← Volver
      </Link>

      <div className="menu-container">
        <Link to="gestion-banear-personaje" className="menu-link">Banear Personaje</Link>
        <Link to="gestion-penar-personaje" className="menu-link">Penar Personaje</Link>
        <Link to="gestion-desloguear-personaje" className="menu-link">Desloguear Personaje</Link>
        <Link to="gestion-bloquear-personaje" className="menu-link">Bloquear Personaje</Link>
        <Link to="gestion-buscar-personaje" className="menu-link">Buscar Personaje</Link>
        <Link to="gestion-recuperar-pass-personaje" className="menu-link">Recuperar contraseña Personaje</Link>
        <Link to="gestion-cambiar-email-personaje" className="menu-link">Cambiar email Personaje</Link>
        <Link to="gestion-cambiar-pin-personaje" className="menu-link">Cambiar PIN Personaje</Link>
      </div>

      {banear && <h2 className="panel-title">Banear Personaje</h2>}
      {penar && <h2 className="panel-title">Penar Personaje</h2>}
      {desloguear && <h2 className="panel-title">Desloguear Personaje</h2>}
      {bloquear && <h2 className="panel-title">Bloquear Personaje</h2>}
      {buscar && <h2 className="panel-title">Buscar Personaje</h2>}
      {recuPass && <h2 className="panel-title">Recuperar contraseña del Personaje</h2>}
      {cambiarEmail && <h2 className="panel-title">Cambiar Email del Personaje</h2>}
      {cambiarPin && <h2 className="panel-title">Cambiar PIN del Personaje</h2>}

      <div className="panel-outlet">
        <Outlet />
      </div>
    </div>
  );
};

export { PanelGestionPersonajes };
