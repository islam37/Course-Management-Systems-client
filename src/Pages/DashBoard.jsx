import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../Components/context/AuthContext";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState(0);
  const [enrollments, setEnrollments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const coursesRes = await axios.get("/courses");
        setCourses(coursesRes.data);

        const enrollmentsRes = await axios.get("/enrollments");
        setEnrollments(enrollmentsRes.data.length);

        const studentEmails = [
          ...new Set(enrollmentsRes.data.map((e) => e.email)),
        ];
        setStudents(studentEmails.length);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Course CMS</h2>
        <nav className="flex flex-col gap-4 flex-1">
          <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium">Overview</Link>
          <Link to="/manage-courses" className="text-gray-700 hover:text-indigo-600 font-medium">Manage Courses</Link>
          <Link to="/add-course" className="text-gray-700 hover:text-indigo-600 font-medium">Add Course</Link>
          <Link to="/enrollments" className="text-gray-700 hover:text-indigo-600 font-medium">Enrollments</Link>
        </nav>
        <button
          onClick={() => { logout(); toast.info("Logged out successfully"); }}
          className="mt-auto flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={user.photoURL || "/profile.jpg"} alt="Profile" className="w-10 h-10 rounded-full object-cover"/>
              <span className="font-medium">{user.displayName || user.email}</span>
            </div>
          </div>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <span className="text-gray-500">Total Courses</span>
            <span className="text-2xl font-bold">{courses.length}</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <span className="text-gray-500">Total Students</span>
            <span className="text-2xl font-bold">{students}</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <span className="text-gray-500">Total Enrollments</span>
            <span className="text-2xl font-bold">{enrollments}</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <span className="text-gray-500">Recent Courses</span>
            <span className="text-2xl font-bold">{courses.slice(-5).length}</span>
          </div>
        </div>

        {/* Recent Courses Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Recent Courses</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-gray-600">Title</th>
                  <th className="p-2 text-gray-600">Instructor</th>
                  <th className="p-2 text-gray-600">Enrollments</th>
                  <th className="p-2 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.slice(-5).reverse().map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="p-2">{course.title}</td>
                    <td className="p-2">{course.creatorName}</td>
                    <td className="p-2">{course.enrollCount || 0}</td>
                    <td className="p-2">
                      <Link to={`/edit-course/${course._id}`} className="text-indigo-600 hover:underline font-medium">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
