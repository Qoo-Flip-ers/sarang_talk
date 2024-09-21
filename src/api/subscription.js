import api from ".";

export const createSubscription = async (payload) =>
  await api.post("/subscription", payload);
