import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CONSTANTS from '../data/config';

const UpdateStudent = () => {
  const [student, setStudent] = useState({ firstName: '', lastName: '', school: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${CONSTANTS.BASE_URL}students/${id}`)
      .then(response => response.json())
      .then(data => setStudent(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${CONSTANTS.BASE_URL}students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
      .then(response => response.json())
      .then(() => {
        alert('Student updated successfully');
        navigate('/list'); // Adjust the path as needed
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      fetch(`${CONSTANTS.BASE_URL}students/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          alert('Student deleted successfully');
          navigate('/list'); // Adjust the path as needed
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>School</label>
          <input
            type="text"
            name="school"
            value={student.school}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Student</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
          Delete Student
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
