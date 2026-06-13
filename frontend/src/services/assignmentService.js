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

export const getAssignments =
async () => {

  const response =
    await API.get(
      "/assignments",
      getAuthConfig()
    );

  return response.data;
};

export const addAssignment =
async (assignmentData) => {

  const formData =
    new FormData();

  formData.append(
    "title",
    assignmentData.title
  );

  formData.append(
    "description",
    assignmentData.description
  );

  formData.append(
    "dueDate",
    assignmentData.dueDate
  );

  formData.append(
    "dueTime",
    assignmentData.dueTime
  );

  formData.append(
    "status",
    assignmentData.status
  );

  if (assignmentData.pdfFile) {

    formData.append(
      "pdfFile",
      assignmentData.pdfFile
    );
  }

  const response =
    await API.post(

      "/assignments",

      formData,

      {
        headers: {
          Authorization:
            `Bearer ${
              localStorage.getItem(
                "token"
              )
            }`
        }
      }
    );

  return response.data;
};

export const updateAssignment =
async (
  id,
  assignmentData
) => {

  const response =
    await API.put(
      `/assignments/${id}`,
      assignmentData,
      getAuthConfig()
    );

  return response.data;
};

export const deleteAssignment =
async (id) => {

  const response =
    await API.delete(
      `/assignments/${id}`,
      getAuthConfig()
    );

  return response.data;
};