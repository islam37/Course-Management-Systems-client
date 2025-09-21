import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading courses...</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-xl mb-4">No courses available yet.</p>
        <Link
          to="/add-course"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-semibold"
        >
          Add a Course
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col"
          >
            <img
              src={course.imageURL || "/fallback-image.jpg"}
              alt={course.title}
              className="h-48 w-full object-cover"
              onError={(e) => (e.target.src = "/fallback-image.jpg")}
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-black font-bold">{course.title}</h3>
              <p className="text-gray-500 text-sm">
                Created on: {new Date(course.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700 flex-1">{course.shortDescription}</p>
              {course.duration && (
                <p className="mt-2 font-medium text-red-400">Duration: {course.duration}</p>
              )}
              {course.creatorName && (
                <p className="mt-1 text-gray-600 text-sm">By: {course.creatorName}</p>
              )}
              <Link
                to={`/courses/${course._id}`}
                className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-black font-bold rounded-lg hover:bg-indigo-700 font-semibold text-center"
                aria-label={`View details of ${course.title}`}
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
