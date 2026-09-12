// export const backend_url = "http://localhost:3000";
// export const server = `${backend_url}/api/v2`;



export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const server = `${backend_url}/api/v2`;