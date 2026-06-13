import { useState, useEffect } from "react";
import { updateProfile,getProfile } from "../services/authService";

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [image, setImage] = useState(null);

  const [profile, setProfile] = useState({
    name: "Aarti",
    email: "aarti@gmail.com",
    phone: "9876543210",
    qualification: "M.Sc Mathematics",
    department: "Science",
    subject: "Mathematics",
    classes: "10A, 10B",
    experience: "5 Years",
    teacherId: "T001",
    joiningDate: "10-Jan-2022",
    studentsHandled: "120"
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    console.log("Saving...", profile);
    // console.log("Teacher:",teacher);
  try {

    const teacher =
      JSON.parse(
        localStorage.getItem(
          "teacher"
        )
      );

    await updateProfile(

      teacher.id,

      profile

    );

    setIsEditing(false);

    alert(
      "Profile Saved Successfully"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Profile Update Failed"
    );
  }
};

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(
        URL.createObjectURL(file)
      );
    }
  };
  useEffect(() => {

  const fetchProfile =
    async () => {

      try {

        const teacher =
          JSON.parse(
            localStorage.getItem(
              "teacher"
            )
          );

        const data =
          await getProfile(
            teacher.id
          );

        setProfile(data);

      } catch (error) {

        console.log(error);
      }
    };

  fetchProfile();

}, []);

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">

          <h1 className="text-4xl font-bold">
            Teacher Profile
          </h1>

          <p className="mt-2 text-lg">
            Manage your professional information
          </p>

        </div>

        <div className="p-8">

          <div className="flex flex-col items-center mb-8">

            <img
              src={
                image ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-lg"
            />

            <label className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">

              Upload Photo

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-semibold">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={profile.qualification}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={profile.subject}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Assigned Classes
              </label>

              <input
                type="text"
                name="classes"
                value={profile.classes}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Experience
              </label>

              <input
                type="text"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Teacher ID
              </label>

              <input
                type="text"
                name="teacherId"
                value={profile.teacherId}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">
                Joining Date
              </label>

              <input
                type="text"
                name="joiningDate"
                value={profile.joiningDate}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">
                Students Handled
              </label>

              <input
                type="text"
                name="studentsHandled"
                value={profile.studentsHandled}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border p-3 rounded-lg mt-1"
              />
            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={() =>
                setIsEditing(true)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Edit Profile
            </button>

            <button
              onClick={handleSave }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;