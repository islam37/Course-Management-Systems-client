import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../Components/context/AuthContext";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/courses/${id}`);
        setCourse(res.data);

        if (user) {
          try {
            const enrollmentRes = await axios.get(
              `/enrollments/check?email=${user.email}&courseId=${id}`
            );
            setIsEnrolled(enrollmentRes.data.enrolled);
          } catch (err) {
            console.error("Error checking enrollment:", err);
            // Don't show error toast for enrollment check as it might be expected
          }
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        if (err.response?.status === 404) {
          setError("Course not found");
        } else {
          setError("Failed to load course details");
        }
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      toast.info("Please log in to enroll in this course");
      navigate("/login", { state: { from: `/courses/${id}` } });
      return;
    }

    try {
      setEnrollLoading(true);
      await axios.post("/enrollments", { 
        email: user.email, 
        courseId: id 
      });
      setIsEnrolled(true);
      toast.success("Successfully enrolled in the course!");
    } catch (err) {
      console.error("Enrollment error:", err);
      if (err.response?.status === 409) {
        setIsEnrolled(true);
        toast.info("You are already enrolled in this course");
      } else {
        toast.error("Failed to enroll in the course");
      }
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
        <Link to="/courses" className="ml-4 text-indigo-600 hover:text-indigo-800">
          Back to Courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Course not found</div>
        <Link to="/courses" className="ml-4 text-indigo-600 hover:text-indigo-800">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/courses"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          ← Back to courses
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img 
              src={course.imageURL} 
              alt={course.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x200?text=Course+Image";
              }}
            />
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span>Created on: {new Date(course.createdAt).toLocaleDateString()}</span>
              {course.enrollCount > 0 && (
                <span>• {course.enrollCount} students enrolled</span>
              )}
            </div>

            <p className="text-gray-700 text-lg mb-6">{course.shortDescription}</p>

            {course.fullDescription && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Course Details</h2>
                <p className="text-gray-700 whitespace-pre-line">{course.fullDescription}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {course.duration && (
                <div>
                  <strong className="text-gray-900">Duration:</strong>
                  <p className="text-gray-700">{course.duration}</p>
                </div>
              )}
              
              {course.creatorName && (
                <div>
                  <strong className="text-gray-900">Instructor:</strong>
                  <p className="text-gray-700">{course.creatorName}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  disabled={enrollLoading}
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enrollLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Enrolling...
                    </>
                  ) : (
                    "Enroll Now"
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg">
                    Already Enrolled
                  </span>
                  <Link
                    to="/my-enrolled"
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                  >
                    View My Courses
                  </Link>
                </div>
              )}

              {user && user.email === course.createdBy && (
                <button
                  onClick={() => navigate(`/edit-course/${course._id}`)}
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  Edit Course
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;