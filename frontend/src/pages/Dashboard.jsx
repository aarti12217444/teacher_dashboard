import { useEffect, useState } from "react";

import { getStudents } from "../services/studentService";
import { getClasses } from "../services/classService";
import { getAssignments } from "../services/assignmentService";
const teacher =
  JSON.parse(
    localStorage.getItem(
      "teacher"
    )
  );

const Dashboard = () => {

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const fetchStudents = async () => {

    try {

      const data = await getStudents();

      setStudents(data);

    } catch (error) {

      console.log(error);

    }
  };

  const fetchClasses = async () => {

    try {

      const data = await getClasses();

      setClasses(data);

    } catch (error) {

      console.log(error);

    }
  };
  const fetchAssignments = async () => {

  try {

    const data =
      await getAssignments();

    setAssignments(data);

  } catch (error) {

    console.log(error);

  }
};

  useEffect(() => {

    const fetchData = async () => {

      await fetchStudents();
      await fetchClasses();
      await fetchAssignments();

    };

    fetchData();

  }, []);

  const pendingAssignments =
  assignments.filter(
    assignment =>
      assignment.status ===
      "Pending"
  ).length;

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg mb-6">

        <h1 className="text-4xl font-bold">
          Welcome, {teacher?.name} 👋
        </h1>

        <p className="mt-2 text-lg">
          Manage students and monitor academic records.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h3 className="text-gray-500">
            Total Students
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {students.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h3 className="text-gray-500">
            Total Classes
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {classes.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h3 className="text-gray-500">
            Upcoming Classes
          </h3>

          <p className="text-4xl font-bold text-orange-600 mt-2">
            {classes.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          

          <h3 className="text-gray-500">
            Pending Assignments
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {pendingAssignments}
          </p>

        </div>

      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          Recent Students
        </h2>

        {students.length === 0 ? (

          <p className="text-gray-500">
            No students available
          </p>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Roll No
                </th>

                <th className="p-3 text-left">
                  Class
                </th>

              </tr>

            </thead>

            <tbody>

              {students
                .slice(-5)
                .reverse()
                .map((student) => (

                  <tr
                    key={student._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {student.name}
                    </td>

                    <td className="p-3">
                      {student.rollNo}
                    </td>

                    <td className="p-3">
                      {student.className}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default Dashboard;