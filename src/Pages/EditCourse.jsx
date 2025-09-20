import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    imageURL: "",
    duration: "",
  });

  const [loading, setLoading] = useState(true);   // Track loading state
  const [error, setError] = useState("");         // Track errors

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/courses/${id}`);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course details.");
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/courses/${id}`, form);
      alert("Course updated successfully!");
      navigate("/manage-courses");
    } catch (err) {
      console.error(err);
      alert("Failed to update course. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/** Title */}
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/** Short Description */}
        <input
          type="text"
          name="shortDescription"
          placeholder="Short Description"
          value={form.shortDescription}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/** Image URL */}
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          value={form.imageURL}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/** Duration */}
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
