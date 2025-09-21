import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/courses");
        const popular = res.data
          .sort((a, b) => (b.enrollCount || 0) - (a.enrollCount || 0))
          .slice(0, 6);
        setCourses(popular);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load popular courses.");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading popular courses...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (courses.length === 0)
    return <p className="text-center mt-10 text-gray-600">No popular courses available.</p>;

  return (
    <section className="my-10 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Popular Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 text-black"
          >
            <img
              src={course.imageURL}
              alt={course.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-500 text-sm">
                {new Date(course.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700 text-sm">
                {course.shortDescription.length > 100
                  ? course.shortDescription.slice(0, 100) + "..."
                  : course.shortDescription}
              </p>
              <Link
                to={`/courses/${course._id}`}
                className="mt-4 inline-block px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800 transition-colors"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
