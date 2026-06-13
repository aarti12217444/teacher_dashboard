import { useEffect, useState } from "react";

import {
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../services/attendanceService";

const Attendance = () => {

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studentName, setStudentName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [editId, setEditId] = useState(null);

  const fetchAttendance = async () => {

    try {

      const data =
        await getAttendance();

      setAttendance(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchAttendance();

  }, []);

  const handleSaveAttendance =
    async () => {

      if (
        !studentName ||
        !date ||
        !status
      ) {

        alert(
          "Fill all fields"
        );

        return;
      }

      try {

        const attendanceData = {

          studentName,
          date,
          status,
        };

        if (editId) {

          await updateAttendance(
            editId,
            attendanceData
          );

          setEditId(null);

        } else {

          await addAttendance(
            attendanceData
          );
        }

        setStudentName("");
        setDate("");
        setStatus("Present");

        fetchAttendance();

      } catch (error) {

        console.log(error);
      }
    };

  const handleEdit = (
    item
  ) => {

    setStudentName(
      item.studentName
    );

    setDate(item.date);

    setStatus(
      item.status
    );

    setEditId(item._id);
  };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete attendance record?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteAttendance(
          id
        );

        fetchAttendance();

      } catch (error) {

        console.log(error);
      }
    };

  if (loading) {

    return (
      <h2 className="p-5 text-xl">
        Loading Attendance...
      </h2>
    );
  }

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Attendance Management
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-5">

        <h2 className="text-xl font-semibold mb-4">

          {editId
            ? "Update Attendance"
            : "Mark Attendance"}

        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) =>
              setStudentName(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
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

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

          </select>

        </div>

        <button
          onClick={
            handleSaveAttendance
          }
          className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
        >

          {editId
            ? "Update Attendance"
            : "Save Attendance"}

        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Student
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.length ===
            0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-5"
                >
                  No Attendance Found
                </td>

              </tr>

            ) : (

              attendance.map(
                (item) => (

                  <tr
                    key={item._id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {
                        item.studentName
                      }
                    </td>

                    <td className="p-4">
                      {item.date}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          item.status ===
                          "Present"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >

                        {
                          item.status
                        }

                      </span>

                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleEdit(
                            item
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Update
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id
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

export default Attendance;