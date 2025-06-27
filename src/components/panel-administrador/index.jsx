import "./style.css";
import { useEffect } from "react";
import { checkRoles } from "../../utils/checkRoles";
import { useNavigate, Link, Outlet, useLocation } from "react-router";

const AdministracionUsuarios = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const isAgregar = location.pathname.endsWith("agregar-roles");
  const isEliminar = location.pathname.endsWith("eliminar-roles");
  const isLogs = location.pathname.endsWith("panel-logs");

  useEffect(() => {
    let roles = checkRoles();
    if (!roles || !roles.includes(1)) {
      navigate("/inicio");
      return;
    }
  }, []);

  return (
    <div className="admin-container">
      <Link to="/inicio" className="admin-back-link">
        Volver
      </Link>

      <div className="role-actions">
        <Link to="agregar-roles" className="btn btn-delete">
          Agregar Roles
        </Link>
        <Link to="eliminar-roles" className="btn btn-delete">
          Eliminar Roles
        </Link>
        <Link to="panel-logs" className="btn btn-delete">
          Ver Logs
        </Link>
      </div>

      {isAgregar && <h2 className="admin-subtitle">Agregar Roles</h2>}
      {isEliminar && <h2 className="admin-subtitle">Eliminar Roles</h2>}
      {isLogs && <h2 className="admin-subtitle">Logs Web</h2>}

      <div className="admin-outlet">
        <Outlet />
      </div>
    </div>
  );
};

export { AdministracionUsuarios };
