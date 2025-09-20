import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const LatestCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/courses");
        const latest = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setCourses(latest);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses. Please try again later.");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <section className="my-16 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
        Latest Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-48">
              <img
                src={course.imageURL}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white text-lg font-semibold">{course.title}</h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-400 text-sm mb-2">
                {new Date(course.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-base mb-4">
                {course.shortDescription.length > 100
                  ? course.shortDescription.slice(0, 100) + "..."
                  : course.shortDescription}
              </p>
              <Link
                to={`/courses/${course._id}`}
                className="block text-center py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCourses;
