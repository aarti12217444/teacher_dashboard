const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRoutes =
require("./routes/authRoutes")
const studentRoutes =
require("./routes/studentRoutes")
const classRoutes =
require("./routes/classRoutes");
const attendanceRoutes =
require("./routes/attendanceRoutes");
const assignmentRoutes =
require("./routes/assignmentRoutes");

require("dotenv").config()

const app = express()




app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/students", studentRoutes)
app.use(
  "/api/classes",
  classRoutes
);
app.use("/api/attendance", attendanceRoutes);
app.use(
  "/api/assignments",
  assignmentRoutes
);
app.use(
  "/uploads",
  express.static("uploads")
);
app.get("/", (req, res) => {
  res.send("Teacher Dashboard API Running")
})

const PORT = process.env.PORT || 5000
connectDB()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})