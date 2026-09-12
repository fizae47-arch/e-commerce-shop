const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const rawSocketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export const backend_url = rawBackendUrl.replace(/\/$/, "");
export const server = `${backend_url}/api/v2`;
export const socket_url = rawSocketUrl.replace(/\/$/, "");
