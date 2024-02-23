// import students from "../data/Students";
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import React from "react";
import CONSTANTS from '../data/config'

const StudentList = (param) => {
    const [studentInfo, setStudentInfo] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`${CONSTANTS.BASE_URL}students`);
        const body = await result.json();
        setStudentInfo(body);
      }
      fetchData();
    }, []);
    
    var filteredStudents = studentInfo;
    
    if (param !== undefined) {
      filteredStudents = Object.values(studentInfo).filter(p => p.studentId !== +param.exceptId);
    }
    
    return (
    <React.Fragment>
      {filteredStudents.map((student, index) => (
        <Link key={index} to={`/detail/${student.studentId}`}>
          <h6>
            {student.studentId} {student.firstName} {student.lastName}
          </h6>
        </Link>
      ))}
    </React.Fragment>
  );
      };
  export default StudentList;