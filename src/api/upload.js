import api from "./";

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await api.post("/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
