import api from ".";

export const getQuestions = async (params) =>
  await api.get("/questions", {
    params,
  });

export const createQuestion = async (payload) =>
  await api.post("/questions", payload);

export const updateQuestion = async (id, payload) =>
  await api.put(`/questions/${id}`, payload);

export const deleteQuestion = async (id) =>
  await api.delete(`/questions/${id}`);
