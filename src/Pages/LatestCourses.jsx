import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

export default function LatestCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/courses").then((res) => {
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCourses(sorted.slice(0, 6));
    });
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Latest Courses</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={course.imageUrl}
                alt={course.title}
                className="h-40 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{course.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(course.createdAt).toLocaleDateString()}
              </p>
              <Link to={`/courses/${course._id}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
