import { useEffect, useState } from "react";

import { getStudents } from "../services/studentService";
import { getAttendance } from "../services/attendanceService";
import { getAssignments } from "../services/assignmentService";

const Performance = () => {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const studentsData =
          await getStudents();

        const attendanceData =
          await getAttendance();

        const assignmentData =
          await getAssignments();

        setStudents(studentsData);
        setAttendance(attendanceData);
        setAssignments(assignmentData);

      } catch (error) {

        console.log(error);
      }
    };

    fetchData();

  }, []);

  const getPerformance = (
    studentName
  ) => {

    const records =
      attendance.filter(
        item =>
          item.studentName ===
          studentName
      );

    const presentCount =
      records.filter(
        item =>
          item.status ===
          "Present"
      ).length;

    const totalCount =
      records.length;

    const percentage =
      totalCount === 0
        ? 0
        : Math.round(
            (presentCount /
              totalCount) *
              100
          );

    let rating =
      "Needs Improvement";

    if (percentage >= 80)
      rating = "Excellent";
    else if (
      percentage >= 60
    )
      rating = "Good";

    return {
      percentage,
      rating
    };
  };

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Student Performance
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Student Name
              </th>

              <th className="p-4 text-left">
                Attendance %
              </th>

              <th className="p-4 text-left">
                Assignments
              </th>

              <th className="p-4 text-left">
                Performance
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map(
              (student) => {

                const result =
                  getPerformance(
                    student.name
                  );

                return (

                  <tr
                    key={student._id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {student.name}
                    </td>

                    <td className="p-4">
                      {
                        result.percentage
                      }%
                    </td>

                    <td className="p-4">
                      {
                        assignments.length
                      }
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          result.rating ===
                          "Excellent"
                            ? "bg-green-600"
                            : result.rating ===
                              "Good"
                            ? "bg-blue-600"
                            : "bg-red-600"
                        }`}
                      >

                        {
                          result.rating
                        }

                      </span>

                    </td>

                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Performance;