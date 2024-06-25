import api from ".";

export const createWord = async (payload) => await api.post("/users", payload);

export const getWords = async (params) =>
  await api.get("/users", {
    params,
  });

export const deleteWord = async (id) => await api.delete(`/users/${id}`);
