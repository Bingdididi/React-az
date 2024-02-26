import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import CONSTANTS from '../data/config';

const EditStudentForm = ({ onSave }) => {
  const { id } = useParams(); // Use useParams to get the id
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    school: '',
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      const response = await fetch(`${CONSTANTS.BASE_URL}students/${id}`); // Use id from useParams
      const data = await response.json();
      setFormData({
        studentId: id,
        firstName: data.firstName,
        lastName: data.lastName,
        school: data.school,
      });
    };
    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${CONSTANTS.BASE_URL}students/${id}`, { // Use id from useParams
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
     onSave(formData);  // Pass back the updated data
    } else {
      console.error('Failed to update student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>School</label>
        <input
          type="text"
          name="school"
          value={formData.school}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Student</button>
    </form>
  );
};

export default EditStudentForm;
