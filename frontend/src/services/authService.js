import API from "../api/axios"

export const loginTeacher = async (data) => {

  const response =
    await API.post(
      "/auth/login",
      data
    )

  return response.data
}
export const updateProfile = async (
  id,
  profileData
) => {

  const response =
    await API.put(

      `/auth/profile/${id}`,

      profileData
    );

  return response.data;
};
export const getProfile = async (
  id
) => {

  const response =
    await API.get(
      `/auth/profile/${id}`
    );

  return response.data;
};
export const registerTeacher = async (data) => {

  const response =
    await API.post(
      "/auth/register",
      data
    );

  return response.data;
};