export async function fetchConAuth(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // 🔒 Token inválido o expirado → deslogueo forzado
      localStorage.removeItem("token");
      window.location.href = "/"; // o usar navigate("/") si estás dentro de React Router
      return;
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchConAuth:", error);
    throw error;
  }
}