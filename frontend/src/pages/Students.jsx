import { useEffect, useState } from "react";

import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../services/studentService";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [className, setClassName] = useState("");

  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.log(
        "Fetch Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  (async () => {
    await fetchStudents();
  })();
}, []);

  const handleAddStudent = async () => {
    if (!name || !rollNo || !className) {
      alert("Fill all fields");
      return;
    }

    try {
      const studentData = {
        name,
        rollNo,
        className,
      };

      if (editId) {
        await updateStudent(editId, studentData);
        setEditId(null);
      } else {
        await addStudent(studentData);
      }

      setName("");
      setRollNo("");
      setClassName("");

      fetchStudents();
    } catch (error) {
      console.log(
        "Error:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.log(
        "Delete Error:",
        error.response?.data || error.message
      );
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setRollNo(student.rollNo);
    setClassName(student.className);

    setEditId(student._id);
  };

  if (loading) {
    return (
      <h2 className="p-5 text-xl">
        Loading Students...
      </h2>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Students
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-5">
        <h2 className="text-xl font-semibold mb-4">
          {editId
            ? "Update Student"
            : "Add Student"}
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Roll Number"
            value={rollNo}
            onChange={(e) =>
              setRollNo(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Class"
            value={className}
            onChange={(e) =>
              setClassName(e.target.value)
            }
            className="border p-3 rounded-lg"
          />
        </div>

        <button
          onClick={handleAddStudent}
          className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          {editId
            ? "Update Student"
            : "Save Student"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Roll No
              </th>

              <th className="p-4 text-left">
                Class
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-5"
                >
                  No Students Found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {student.name}
                  </td>

                  <td className="p-4">
                    {student.rollNo}
                  </td>

                  <td className="p-4">
                    {student.className}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleEdit(student)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          student._id
                        )
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;