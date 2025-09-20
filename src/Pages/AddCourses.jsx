import React, { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../Components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Css/AddCourse.css";

const AddCourse = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    imageURL: "",
    duration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) newErrors.title = "Course title is required";
    if (!form.shortDescription.trim()) newErrors.shortDescription = "Description is required";
    if (!form.imageURL.trim()) newErrors.imageURL = "Image URL is required";
    if (!form.duration.trim()) newErrors.duration = "Duration is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      showNotification("You must be logged in to add a course!", "error");
      return;
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const courseData = {
        ...form,
        createdBy: user.email,
        creatorName: user.displayName,
        createdAt: new Date(),
        enrollCount: 0,
      };
      
      await axios.post("/courses", courseData);
      
      showNotification("Course added successfully!", "success");
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate("/manage-courses");
      }, 1500);
      
    } catch (err) {
      console.error(err);
      showNotification("Failed to add course. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-course-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <div className="add-course-card">
        <div className="add-course-header">
          <h2>
            <i className="fas fa-plus-circle"></i>
            Add New Course
          </h2>
          <p>Create a new learning experience for your students</p>
        </div>
        
        <form onSubmit={handleSubmit} className="add-course-form">
          <div className="form-group">
            <label htmlFor="title">
              <i className="fas fa-book"></i>
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Introduction to Web Development"
              value={form.title}
              onChange={handleChange}
              className={errors.title ? "error" : ""}
              required
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="shortDescription">
              <i className="fas fa-align-left"></i>
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              placeholder="Briefly describe what students will learn in this course..."
              value={form.shortDescription}
              onChange={handleChange}
              className={errors.shortDescription ? "error" : ""}
              rows="3"
              required
            />
            {errors.shortDescription && <span className="error-message">{errors.shortDescription}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="imageURL">
              <i className="fas fa-image"></i>
              Course Image URL
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              placeholder="https://example.com/image.jpg"
              value={form.imageURL}
              onChange={handleChange}
              className={errors.imageURL ? "error" : ""}
              required
            />
            {errors.imageURL && <span className="error-message">{errors.imageURL}</span>}
            {form.imageURL && (
              <div className="image-preview">
                <p>Image Preview:</p>
                <img src={form.imageURL} alt="Course preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="duration">
              <i className="fas fa-clock"></i>
              Course Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              placeholder="e.g., 6 weeks, 12 hours"
              value={form.duration}
              onChange={handleChange}
              className={errors.duration ? "error" : ""}
              required
            />
            {errors.duration && <span className="error-message">{errors.duration}</span>}
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Adding Course...
              </>
            ) : (
              <>
                <i className="fas fa-plus"></i>
                Add Course
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;