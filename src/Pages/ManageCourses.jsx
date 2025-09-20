import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../Components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ManageCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/courses");
        setCourses(res.data.filter((c) => c.createdBy === user.email));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses.");
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`/courses/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
      alert("Course deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete course. Please try again.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-b-4"></div>
    </div>
  );

  if (error) return <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>;

  if (courses.length === 0) return (
    <p className="text-center mt-10 text-gray-600 font-medium">You have no courses yet.</p>
  );

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Manage Your Courses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Short Description</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="hover:bg-indigo-50 transition-colors">
                <td className="py-3 px-4 border-b border-gray-200 font-medium text-gray-800">{course.title}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-600">{course.shortDescription}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/edit-course/${course._id}`)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;
