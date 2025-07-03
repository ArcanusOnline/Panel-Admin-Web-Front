import { Link, Outlet, useLocation } from "react-router";
import "./style.css";
import { useEffect } from "react";
import { checkRoles } from "../../utils/checkRoles";

const PanelGestionPersonajes = () => {
  let location = useLocation();
  let banear = location.pathname.endsWith("gestion-banear-personaje");
  let penar = location.pathname.endsWith("gestion-penar-personaje");
  let desloguear = location.pathname.endsWith("gestion-desloguear-personaje");
  let bloquear = location.pathname.endsWith("gestion-bloquear-personaje");
  let buscar = location.pathname.endsWith("gestion-buscar-personaje");
  let recuPass = location.pathname.endsWith("gestion-recuperar-pass-personaje");
  let cambiarEmail = location.pathname.endsWith(
    "gestion-cambiar-email-personaje"
  );
  let cambiarPin = location.pathname.endsWith("gestion-cambiar-pin-personaje");

  useEffect(() => {
    let roles = checkRoles();
    if (!roles || !roles.includes(5)) {
      navigate("/inicio");
      return;
    }
  }, []);

  return (
    <>
      <Link to="/inicio" className="admin-back-link">
        Volver
      </Link>
      <div className="menu-container">
        <Link to="gestion-banear-personaje" className="menu-link">
          Banear Personaje
        </Link>
        <Link to="gestion-penar-personaje" className="menu-link">
          Penar Personaje
        </Link>
        <Link to="gestion-desloguear-personaje" className="menu-link">
          Desloguear Personaje
        </Link>
        <Link to="gestion-bloquear-personaje" className="menu-link">
          Bloquear Personaje
        </Link>
        <Link to="gestion-buscar-personaje" className="menu-link">
          Buscar Personaje
        </Link>
        <Link to="gestion-recuperar-pass-personaje" className="menu-link">
          Recuperar contraseña Personaje
        </Link>
        <Link to="gestion-cambiar-email-personaje" className="menu-link">
          Cambiar email Personaje
        </Link>
        <Link to="gestion-cambiar-pin-personaje" className="menu-link">
          Cambiar PIN Personaje
        </Link>
      </div>
      {banear && <h2>Banear Personaje</h2>}
      {penar && <h2>Penar Personaje</h2>}
      {desloguear && <h2>Desloguear Personaje</h2>}
      {bloquear && <h2>Bloquear Personaje</h2>}
      {buscar && <h2>Buscar Personaje</h2>}
      {recuPass && <h2>Recuperar contraseña del Personaje</h2>}
      {cambiarEmail && <h2>Cambiar Email del Personaje</h2>}
      {cambiarPin && <h2>Cambiar PIN del Personaje</h2>}
      <div>
        <Outlet />
      </div>
    </>
  );
};

export { PanelGestionPersonajes };
