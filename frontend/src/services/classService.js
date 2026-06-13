import API from "../api/axios";

export const getClasses = async () => {
  const response = await API.get("/classes");
  return response.data;
};

export const addClass = async (classData) => {
  const response = await API.post(
    "/classes",
    classData
  );

  return response.data;
};

export const updateClass = async (
  id,
  classData
) => {
  const response = await API.put(
    `/classes/${id}`,
    classData
  );

  return response.data;
};

export const deleteClass = async (
  id
) => {
  const response = await API.delete(
    `/classes/${id}`
  );

  return response.data;
};