import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import {
  Login,
  PanelInicio,
  AdministracionUsuarios,
  PanelNoticias,
  EliminarRoles,
  AgregarRoles,
  AgregarNoticia,
  PanelEditNoticia,
  PanelSoporte,
  ResponderSoporte,
  Fotodenuncias,
  CheckeoDenuncias,
  PanelLogs,
  PanelGmEdit,
  PanelGestionPersonajes,
} from "./components/index";
import { PrivateRoute } from "./utils/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/inicio" element={<PanelInicio />} />
            <Route path="/administrador" element={<AdministracionUsuarios />}>
              <Route path="agregar-roles" element={<AgregarRoles />} />
              <Route path="eliminar-roles" element={<EliminarRoles />} />
              <Route path="panel-logs" element={<PanelLogs />} />
              <Route path="panel-gm-edit" element={<PanelGmEdit />} />
            </Route>
            <Route path="/noticias" element={<PanelNoticias />}>
              <Route path="agregar-noticia" element={<AgregarNoticia />} />
              <Route path="editar-noticia/:id" element={<PanelEditNoticia />} />
            </Route>
            <Route path="/soportes" element={<PanelSoporte />} />
            <Route path="/responder-soporte" element={<ResponderSoporte />} />
            <Route path="/fotodenuncias" element={<Fotodenuncias />}>
              <Route path="check-denuncia" element={<CheckeoDenuncias />} />
            </Route>
            <Route
              path="/gestion-de-personajes"
              element={<PanelGestionPersonajes />}
            >
              <Route path="gestion-banear-personaje" element={null} />
              <Route path="gestion-penar-personaje" element={null} />
              <Route path="gestion-desloguear-personaje" element={null} />
              <Route path="gestion-bloquear-personaje" element={null} />
              <Route path="gestion-buscar-personaje" element={null} />
              <Route path="gestion-recuperar-pass-personaje" element={null} />
              <Route path="gestion-cambiar-email-personaje" element={null} />
              <Route path="gestion-cambiar-pin-personaje" element={null} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
