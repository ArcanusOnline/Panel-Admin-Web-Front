let urlBackend = import.meta.env.VITE_URL_BACKEND;
import { fetchConAuth } from "../utils/fetchConAuth";

async function iniciarSesion(username) {
  try {
    let response = await fetch(`${urlBackend}/iniciar-sesion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    let data = await response.json();
    if (!response.ok) {
      return data.msg;
    }
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function obtenerRangosCuenta(username) {
  try {
    let response = await fetch(`${urlBackend}/obtener-rangos-cuentas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();

    if (!response.ok) {
      return data;
    }
    return data.rangos;
  } catch (error) {
    console.error(error);
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function obtenerRangos() {
  try {
    let response = await fetch(`${urlBackend}/obtener-rangos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return data;
    }
    return data.rangos[0];
  } catch (error) {
    console.error(error);
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function obtenerNoticias() {
  try {
    let response = await fetch(`${urlBackend}/obtener-noticias`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function obtenerSectoresSoporte() {
  try {
    let response = await fetch(`${urlBackend}/obtener-sectores-soporte`);
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function obtenerSoportes() {
  try {
    let response = await fetch(`${urlBackend}/obtener-lista-soportes`);
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function cerrarSoporte(id) {
  try {
    let response = await fetch(`${urlBackend}/cerrar-soporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function obtenerDataSoporte(id) {
  try {
    let response = await fetch(`${urlBackend}/obtener-datos-soporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function responderSoporte(fields) {
  try {
    let response = await fetch(`${urlBackend}/enviar-respuesta-soporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function ingresarNoticiaNueva(fields) {
  try {
    let response = await fetch(`${urlBackend}/insertar-noticia-nueva`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function eliminarNoticiaPanel(id) {
  try {
    let response = await fetch(`${urlBackend}/eliminar-noticia-panel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function agregarRoles(username, rangos) {
  try {
    let response = await fetch(`${urlBackend}/agregar-roles-panel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, rangos }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function eliminarRoles(username, rangos) {
  try {
    let response = await fetch(`${urlBackend}/eliminar-roles-panel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, rangos }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    return { message: "Hubo un error al conectarse con el servidor" };
  }
}

async function actualizarNoticia(id, noticiaData) {
  try {
    const response = await fetch(`${urlBackend}/editar-noticia/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noticiaData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarNoticiaAPI:", error);
    throw error;
  }
}

async function traerFotodenuncias() {
  try {
    let response = await fetch(`${urlBackend}/listar-fotodenuncias`);
    if (!response.ok) {
      let data = await response.json();
      return data;
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarNoticiaAPI:", error);
    throw error;
  }
}

async function traerEstadoYPenas(nombre) {
  try {
    let response = await fetch(`${urlBackend}/obtener-penas-y-estado`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en traerEstadoYPenas:", error);
    throw error;
  }
}

async function marcarComoLeidaFD({ mensaje, id }) {
  try {
    let response = await fetch(`${urlBackend}/cambiar-estado-FD`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mensaje, id }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en marcarComoLeidaFD:", error);
    throw error;
  }
}

async function encarcelarPersonajeWeb({ nick, tiempo, gm, razon }) {
  try {
    let response = await fetch(`${urlBackend}/encarcerlar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nick, tiempo, gm, razon }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en encarcelarPersonajeWeb:", error);
    throw error;
  }
}

async function encarcelarPersonajeWebGestionOn({ nick, tiempo, gm, razon }) {
  try {
    let response = await fetch(`${urlBackend}/penar-personaje-gestion-on`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gm}`,
      },
      body: JSON.stringify({ nick, tiempo, razon }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en encarcelarPersonajeWeb:", error);
    throw error;
  }
}

async function encarcelarPersonajeOffline({ personaje, pena, ban, token }) {
  try {
    let response = await fetch(`${urlBackend}/penar-personaje-offline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ personaje, pena, ban }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en encarcelarPersonajeOffline:", error);
    throw error;
  }
}

async function encarcelarPersonajeOfflineGestion({
  personaje,
  pena,
  tiempo,
  token,
}) {
  try {
    let response = await fetch(`${urlBackend}/penar-panel-gestion-off`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ personaje, pena, tiempo }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en encarcelarPersonajeOffline:", error);
    throw error;
  }
}

async function banearSiEstaOnline({ nick, tiempo, gm, razon, idPena }) {
  try {
    let response = await fetch(`${urlBackend}/banear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nick, tiempo, gm, razon, idPena }),
    });
    let data = await response.json();
    if (data.status === "ok") {
      let deslogeoRes = await fetch(`${urlBackend}/desloguear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nick }),
      });
      let deslogeoData = await deslogeoRes.json();
      return deslogeoData;
    }
  } catch (error) {
    console.error("Error en banearSiEstaOnline:", error);
    throw error;
  }
}

async function banearSiEstaOnlinePanelGestion({ nick, tiempo, gm, razon }) {
  try {
    let response = await fetch(`${urlBackend}/banear-online-gestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nick, tiempo, gm, razon }),
    });
    let data = await response.json();
    if (data.status === "ok") {
      let deslogeoRes = await fetch(`${urlBackend}/desloguear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nick }),
      });
      let deslogeoData = await deslogeoRes.json();
      return deslogeoData;
    }
  } catch (error) {
    console.error("Error en banearSiEstaOnline:", error);
    throw error;
  }
}

async function deslogearPersonajeGestion({ nick, token }) {
  try {
    let deslogeoRes = await fetch(`${urlBackend}/desloguear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nick }),
    });
    let deslogeoData = await deslogeoRes.json();
    return deslogeoData;
  } catch (error) {
    console.error("Error en deslogearPersonajeGestion:", error);
    throw error;
  }
}

async function bloquearPersonaje({ usuario, status, token }) {
  try {
    let response = await fetch(`${urlBackend}/bloquear-personaje-panel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ usuario, status }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al bloquear personaje:", error.message);
    return { message: error.message || "Error en la solicitud", error: 1 };
  }
}

async function desbloquearPersonaje({ usuario, status }) {
  try {
    let response = await fetchConAuth(
      `${urlBackend}/desbloquear-personaje-gestion`,
      {
        method: "POST",
        body: JSON.stringify({ usuario, status }),
      }
    );
    return response;
  } catch (error) {
    console.error("Error al bloquear personaje:", error.message);
    return { message: error.message || "Error en la solicitud", error: 1 };
  }
}

async function banearPjOfflineGestion({ personaje, motivo, tiempo, gm }) {
  try {
    let response = await fetch(`${urlBackend}/banear-panel-gestion-off`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personaje, motivo, tiempo, gm }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en banearPjOfflineGestion:", error);
    throw error;
  }
}

async function censurarMensajeSoporte(id) {
  try {
    let response = await fetch(`${urlBackend}/censurar-mensaje-soporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en censurarMensajeSoporte:", error);
    throw error;
  }
}

async function traerLogs() {
  try {
    let response = await fetch(`${urlBackend}/traer-logs-web`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en traerLogs:", error);
    throw error;
  }
}

async function traerFotodenunciasPorId(id) {
  try {
    let response = await fetch(`${urlBackend}/listar-fotodenuncia-por-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      let data = await response.json();
      return data;
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en traerFotodenunciasPorId:", error);
    throw error;
  }
}

async function ingresarRolGm(fields) {
  try {
    let response = await fetch(`${urlBackend}/agregar-roles-gm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: fields.usuario,
        rol: fields.privilegio,
        fecha: fields.desde,
      }),
    });

    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en ingresarRolGm:", error);
    throw error;
  }
}

async function enviarEmailRecuGestion({ nick, token }) {
  try {
    let response = await fetch(`${urlBackend}/enviar-recupass-gestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nick,
      }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en enviarEmailRecuGestion:", error);
    throw error;
  }
}

async function cambiarEmailGestion({ nick, token, email }) {
  try {
    let response = await fetch(`${urlBackend}/cambiar-email-gestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nick,
        email,
      }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en cambiarEmailGestion:", error);
    throw error;
  }
}

async function cambiarPinGestion({ nick, token, pinNueva, numeroSoporte }) {
  try {
    let response = await fetchConAuth(`${urlBackend}/cambiar-pin-gestion`, {
      method: "POST",
      body: JSON.stringify({
        nick,
        pinNueva,
        numeroSoporte,
      }),
    });

    return response;
  } catch (error) {
    console.error("Error en cambiarPinGestion:", error);
    throw error;
  }
}

async function unbanearPersonajeGestion({ nick, numeroSoporte }) {
  try {
    let response = await fetchConAuth(
      `${urlBackend}/unbanear-personaje-gestion`,
      {
        method: "POST",
        body: JSON.stringify({
          nick,
          numeroSoporte,
        }),
      }
    );

    return response;
  } catch (error) {
    console.error("Error en cambiarPinGestion:", error);
    throw error;
  }
}

export {
  iniciarSesion,
  obtenerRangosCuenta,
  obtenerRangos,
  obtenerNoticias,
  obtenerSectoresSoporte,
  obtenerSoportes,
  cerrarSoporte,
  obtenerDataSoporte,
  responderSoporte,
  ingresarNoticiaNueva,
  eliminarNoticiaPanel,
  agregarRoles,
  eliminarRoles,
  actualizarNoticia,
  traerFotodenuncias,
  traerEstadoYPenas,
  marcarComoLeidaFD,
  encarcelarPersonajeWeb,
  encarcelarPersonajeOffline,
  banearSiEstaOnline,
  censurarMensajeSoporte,
  traerLogs,
  traerFotodenunciasPorId,
  ingresarRolGm,
  banearSiEstaOnlinePanelGestion,
  banearPjOfflineGestion,
  encarcelarPersonajeWebGestionOn,
  encarcelarPersonajeOfflineGestion,
  deslogearPersonajeGestion,
  bloquearPersonaje,
  enviarEmailRecuGestion,
  cambiarEmailGestion,
  cambiarPinGestion,
  unbanearPersonajeGestion,
  desbloquearPersonaje,
};
