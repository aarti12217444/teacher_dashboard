import API from "../api/axios"

const getAuthConfig = () => {

  const token = localStorage.getItem("token")

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const getStudents = async () => {

  const response = await API.get(
    "/students",
    getAuthConfig()
  )

  return response.data
}

export const addStudent = async (studentData) => {

  const response = await API.post(
    "/students",
    studentData,
    getAuthConfig()
  )

  return response.data
}

export const deleteStudent = async (id) => {

  const response = await API.delete(
    `/students/${id}`,
    getAuthConfig()
  )

  return response.data
}
export const updateStudent = async (
  id,
  studentData
) => {

  const response = await API.put(

    `/students/${id}`,

    studentData,

    getAuthConfig()
  )

  return response.data
}