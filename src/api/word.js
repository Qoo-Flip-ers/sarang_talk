import api from ".";

export const createWord = async (payload) => await api.post("/words", payload);

export const getWords = async (params) =>
  await api.get("/words", {
    params,
  });

// export const deletWord = async (id) => await api.delete("/words/" + id);
export const deleteWord = async (id) => await api.delete(`/words/${id}`);
// export const createWord = async (korean, description, pronunciation, level) =>
//   await api.post("/words", {
//     korean: korean,
//     description: description,
//     pronunciation: pronunciation,
//     level: level,
//   });
