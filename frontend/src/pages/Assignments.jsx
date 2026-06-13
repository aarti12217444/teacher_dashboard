import { useEffect, useState } from "react";

import {
  getAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} from "../services/assignmentService";

const Assignments = () => {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const [editId, setEditId] = useState(null);
  const [dueTime, setDueTime] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const fetchAssignments = async () => {

    try {

      const data =
        await getAssignments();

      setAssignments(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchAssignments();

  }, []);

  const handleSaveAssignment =
    async () => {

      if (
        !title ||
        !description ||
        !dueDate
      ) {

        alert(
          "Fill all fields"
        );

        return;
      }

      try {

        const assignmentData = {

          title,
          description,
          dueDate,
          dueTime,
          pdfFile,
          status
          
        };

        if (editId) {

          await updateAssignment(
            editId,
            assignmentData
          );

          setEditId(null);

        } else {

          await addAssignment(
            assignmentData
          );
        }

        setTitle("");
        setDescription("");
        setDueDate("");
        setDueTime("");
        setPdfFile(null);
        setStatus("Pending");

        fetchAssignments();

      } catch (error) {

        console.log(error);
      }
    };

  const handleEdit = (
    assignment
  ) => {

    setTitle(
      assignment.title
    );

    setDescription(
      assignment.description
    );

    setDueDate(
      assignment.dueDate
    );
    setDueTime(
  assignment.dueTime || ""
);

    setStatus(
      assignment.status
    );

    setEditId(
      assignment._id
    );
  };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Assignment?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteAssignment(
          id
        );

        fetchAssignments();

      } catch (error) {

        console.log(error);
      }
    };

  if (loading) {

    return (
      <h2 className="p-5 text-xl">
        Loading Assignments...
      </h2>
    );
  }

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Assignment Management
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-5">

        <h2 className="text-xl font-semibold mb-4">

          {editId
            ? "Update Assignment"
            : "Add Assignment"}

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />
          <input
  type="time"
  value={dueTime}
  onChange={(e) =>
    setDueTime(
      e.target.value
    )
  }
  className="border p-3 rounded-lg"
/>
<input
  type="file"
  accept=".pdf"
  onChange={(e) =>
    setPdfFile(
      e.target.files[0]
    )
  }
  className="border p-3 rounded-lg"
/>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="border p-3 rounded-lg md:col-span-2"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>

        <button
          onClick={
            handleSaveAssignment
          }
          className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
        >

          {editId
            ? "Update Assignment"
            : "Save Assignment"}

        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Due Date
              </th>

              <th className="p-4 text-left">
                Due Time
              </th>

              <th className="p-4 text-left">
                Status
              </th>
              <th className="p-4 text-left">
                PDF
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {assignments.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center p-5"
                >
                  No Assignments Found
                </td>

              </tr>

            ) : (

              assignments.map(
                (assignment) => (

                  <tr
                    key={assignment._id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {assignment.title}
                    </td>

                    <td className="p-4">
                      {assignment.dueDate}
                    </td>

                    <td className="p-4">
                      {assignment.dueTime}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          assignment.status ===
                          "Completed"
                            ? "bg-green-600"
                            : "bg-orange-500"
                        }`}
                      >

                        {
                          assignment.status
                        }

                      </span>

                    </td>
                    <td className="p-4">

  {assignment.pdfFile ? (

    <a
      href={`http://localhost:5000/uploads/${assignment.pdfFile}`}
      target="_blank"
      rel="noreferrer"
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      View PDF
    </a>

  ) : (

    <span className="text-gray-500">
      No PDF
    </span>

  )}

</td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleEdit(
                            assignment
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Update
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            assignment._id
                          )
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Assignments;