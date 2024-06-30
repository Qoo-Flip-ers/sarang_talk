import api from ".";

export const getWords = async (params) =>
  await api.get("/words", {
    params,
  });

export const createWord = async (payload) => await api.post("/words", payload);

export const updateWord = async (id, payload) =>
  await api.put(`/words/${id}`, payload);

export const deleteWord = async (id) => await api.delete(`/words/${id}`);
