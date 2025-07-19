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
  BanearPersonajeGestion,
  PenarPersonajeGestion,
  DeslogearPersonajeGestion,
  BloquearPersonajeGestion,
  BuscarPersonajeGestion,
  RecuperarPwPersonajeGestion,
  CambiarPinPersonajeGestion,
  CambiarEmailPersonajeGestion,
  UnbanearPersonajeGestion,
  DesbloquearPersonajeGestion,
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
              <Route
                path="gestion-banear-personaje"
                element={<BanearPersonajeGestion />}
              />
              <Route
                path="gestion-penar-personaje"
                element={<PenarPersonajeGestion />}
              />
              <Route
                path="gestion-desloguear-personaje"
                element={<DeslogearPersonajeGestion />}
              />
              <Route
                path="gestion-bloquear-personaje"
                element={<BloquearPersonajeGestion />}
              />
              <Route
                path="gestion-buscar-personaje"
                element={<BuscarPersonajeGestion />}
              />
              <Route
                path="gestion-unbanear-personaje"
                element={<UnbanearPersonajeGestion />}
              />
              <Route
                path="gestion-recuperar-pass-personaje"
                element={<RecuperarPwPersonajeGestion />}
              />
              <Route
                path="gestion-cambiar-email-personaje"
                element={<CambiarEmailPersonajeGestion />}
              />
              <Route
                path="gestion-cambiar-pin-personaje"
                element={<CambiarPinPersonajeGestion />}
              />
                            <Route
                path="gestion-desbloquear-personaje"
                element={<DesbloquearPersonajeGestion />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
