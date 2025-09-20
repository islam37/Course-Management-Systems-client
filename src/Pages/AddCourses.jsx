import React from 'react';

const AddCourses = () => {
    return (
        <div>
            <h2>Add a New Course</h2>
            <form>
                <div>
                    <label htmlFor="title">Course Title</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="description">Course Description</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div>
                    <label htmlFor="image">Course Image URL</label>
                    <input type="url" id="image" name="image" required />
                </div>
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourses;