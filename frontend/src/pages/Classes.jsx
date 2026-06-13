import { useEffect, useState } from "react";

import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../services/classService";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [schedule, setSchedule] = useState("");
  const [sessionDate, setSessionDate] = useState("");
const [sessionTime, setSessionTime] = useState("");

  const [editId, setEditId] = useState(null);

  const fetchClasses = async () => {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSaveClass = async () => {
    if (
      !className ||
      !section ||
      !roomNumber ||
      !schedule
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      const classData = {
  className,
  section,
  roomNumber,
  schedule,
  sessionDate,
  sessionTime
};

      if (editId) {
        await updateClass(
          editId,
          classData
        );
        setEditId(null);
      } else {
        await addClass(classData);
      }

      setClassName("");
      setSection("");
      setRoomNumber("");
      setSchedule("");
      setSessionDate("");
      setSessionTime("");

      fetchClasses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (cls) => {

  setClassName(cls.className);
  setSection(cls.section);
  setRoomNumber(cls.roomNumber);
  setSchedule(cls.schedule);

  setSessionDate(
    cls.sessionDate || ""
  );

  setSessionTime(
    cls.sessionTime || ""
  );

  setEditId(cls._id);
};

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this class?"
      );

    if (!confirmDelete) return;

    try {
      await deleteClass(id);
      fetchClasses();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h2 className="p-5 text-xl">
        Loading Classes...
      </h2>
    );
  }

  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Classes
      </h1>

      <div className="grid md:grid-cols-2 gap-4 mb-5">

          <div className="bg-blue-600 text-white p-5 rounded-xl">

            <h3 className="text-lg font-semibold">
              Total Classes
            </h3>

            <p className="text-3xl font-bold">
              {classes.length}
            </p>

          </div>

          <div className="bg-green-600 text-white p-5 rounded-xl">

            <h3 className="text-lg font-semibold">
              Upcoming Sessions
            </h3>

            <p className="text-3xl font-bold">
              {
                classes.filter(
                  cls => cls.sessionDate
                ).length
              }
            </p>

          </div>

        </div>
      <div className="bg-white p-5 rounded-xl shadow mb-5">

        <h2 className="text-xl font-semibold mb-4">
          {editId
            ? "Update Class"
            : "Add Class"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Class Name"
            value={className}
            onChange={(e) =>
              setClassName(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Section"
            value={section}
            onChange={(e) =>
              setSection(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) =>
              setRoomNumber(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Schedule"
            value={schedule}
            onChange={(e) =>
              setSchedule(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />
          <input
  type="date"
  value={sessionDate}
  onChange={(e) =>
    setSessionDate(
      e.target.value
    )
  }
  className="border p-3 rounded-lg"
/>

<input
  type="time"
  value={sessionTime}
  onChange={(e) =>
    setSessionTime(
      e.target.value
    )
  }
  className="border p-3 rounded-lg"
/>

        </div>

        <button
          onClick={handleSaveClass}
          className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          {editId
            ? "Update Class"
            : "Save Class"}
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Class Name
              </th>

              <th className="p-4 text-left">
                Section
              </th>

              <th className="p-4 text-left">
                Room Number
              </th>

              <th className="p-4 text-left">
                Schedule
              </th>

              <th className="p-4 text-left">
                Session Date
              </th>

              <th className="p-4 text-left">
                Session Time
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {classes.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center p-5"
                >
                  No Classes Found
                </td>

              </tr>

            ) : (

              classes.map((cls) => (

                <tr
                  key={cls._id}
                  className="border-b"
                >

                  <td className="p-4">
                    {cls.className}
                  </td>

                  <td className="p-4">
                    {cls.section}
                  </td>

                  <td className="p-4">
                    {cls.roomNumber}
                  </td>

                 <td className="p-4">
                  {cls.schedule}
                </td>

                <td className="p-4">
                  {cls.sessionDate}
                </td>

                <td className="p-4">
                  {cls.sessionTime}
                </td>

                <td className="p-4">

                    <button
                      onClick={() =>
                        handleEdit(cls)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          cls._id
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

export default Classes;