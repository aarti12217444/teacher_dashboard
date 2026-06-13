import API from "../api/axios";

const getAuthConfig = () => {

  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  };
};

export const getAttendance =
async () => {

  const response =
    await API.get(
      "/attendance",
      getAuthConfig()
    );

  return response.data;
};

export const addAttendance =
async (attendanceData) => {

  const response =
    await API.post(
      "/attendance",
      attendanceData,
      getAuthConfig()
    );

  return response.data;
};

export const updateAttendance =
async (
  id,
  attendanceData
) => {

  const response =
    await API.put(
      `/attendance/${id}`,
      attendanceData,
      getAuthConfig()
    );

  return response.data;
};

export const deleteAttendance =
async (id) => {

  const response =
    await API.delete(
      `/attendance/${id}`,
      getAuthConfig()
    );

  return response.data;
};