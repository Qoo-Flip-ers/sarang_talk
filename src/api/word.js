import api from ".";

export const getWords = async (params) =>
  await api.get("/words", {
    params,
  });

export const getWordsOnlyEN = async (params) =>
  await api.get("/words/empty/en", {
    params,
  });

export const getWord = async (id) => await api.get(`/words/${id}`);

export const createWord = async (payload) => await api.post("/words", payload);

export const updateWord = async (id, payload) =>
  await api.put(`/words/${id}`, payload);

export const deleteWord = async (id) => await api.delete(`/words/${id}`);

export const checkWord = async (korean) =>
  await api.post("/words/check", { korean });

export const getWordsCount = async () => await api.get("/words/types");

export const generateWord = async (expression) =>
  await api.post("/generate/word", { expression });

export const getWordSounds = async (word) =>
  await api.post(`/generate/speech`, {
    word,
  });

export const combineAudioGif = async (payload) =>
  await api.post("/generate/combine-gif-audio", payload);

export const getWordSoundsByNaver = async (word) =>
  await api.get("/generate/pronunciation", {
    params: {
      word,
    },
  });
