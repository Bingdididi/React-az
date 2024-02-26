import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentList from "../components/StudentList";
import NotFoundPage from "./NotFoundPage";
import CONSTANTS from '../data/config';
import AddStudentForm from "../components/AddStudentForm";
import EditStudentForm from "../components/EditStudentForm"; // Ensure this is imported

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`${CONSTANTS.BASE_URL}students/${id}`);
        if (!result.ok) throw new Error('Student not found');
        const body = await result.json();
        setStudentInfo(body);
      } catch (error) {
        console.error(error);
        navigate('/not-found'); // Navigate to a not found page or handle error differently
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleUpdate = async (updatedStudentInfo) => {
    console.log('Updating student with:', updatedStudentInfo);
    try {
      const response = await fetch(`${CONSTANTS.BASE_URL}students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedStudentInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Failed to update student - Status:', response.status, 'Body:', errorBody);
        throw new Error(`API responded with status ${response.status}`);
      }
      // Check if the response has content before parsing it as JSON
      const text = await response.text();
      const updatedInfo = text ? JSON.parse(text) : {};
      setStudentInfo(updatedInfo); // Update local state with the latest server state
      setEditMode(false); // Exit edit mode with updated information displayed
      navigate('/list');  // Navigate to the updated student's detail page (optional, but useful for UX)
    } catch (error) {
      console.error('Failed to update student', error);
      // Implement UI feedback for errors (e.g., error message display)
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`${CONSTANTS.BASE_URL}students/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      navigate('/list'); // Navigate back to the student list after successful deletion
    } catch (error) {
      console.error('Failed to delete student', error);
      // Implement UI feedback for errors
    }
  };

  if (studentInfo === undefined) return <NotFoundPage />;
  if (!studentInfo) return <p>Loading...</p>;

  return (
    <React.Fragment>
      {editMode ? (
        <div>
          <h3>Edit Student Information</h3>
          <EditStudentForm studentInfo={studentInfo} onSave={handleUpdate} />
        </div>
      ) : (
        <div>
          <div style={{ width: "20%", float: "right" }}>
            <h3>Others:</h3>
            <StudentList exceptId={studentInfo.studentId} />
          </div>

          <h4 className="text-danger">Student ID={studentInfo.studentId}</h4>
          <p>
            <b>Name: </b>
            {studentInfo.firstName} {studentInfo.lastName}
          </p>
          <p>
            <b>School: </b>
            {studentInfo.school}
          </p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <div style={{ width: "50%", float: "left" }}>
        <AddStudentForm />
      </div>
    </React.Fragment>
  );
};

export default StudentDetailPage;
