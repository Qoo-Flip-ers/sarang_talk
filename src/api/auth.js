import api from ".";

export const login = async (payload) => await api.post("/auth/login", payload);
