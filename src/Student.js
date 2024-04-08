import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setId] = useState(null);
  const [studentName, setName] = useState('');
  const [standard, setStandard] = useState(null);
  const [error, setError] = useState('');

  // For intial fetch call execution.
  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch student details.
  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://localhost:7139/api/Student');
      setStudents(response.data);
    } catch (error) {
      console.error( error);

      // Set the error message.
      let e = error?.response?.data;
      setError( e.title ?  e.title : e );
    }
  };

  // Add Students call.
  const addStudent = async () => {
    try {
      const response = await axios.post('https://localhost:7139/api/Student', { studentName, standard });
      setStudents([...students, response.data]);
      clearForm();
    } catch (error) {
      console.error(error);

      // Set the error message.
      let e = error?.response?.data;
      setError( e.title ?  e.title : e );
    }
  };

  // Sets the details of the students.
  const editStudent = (student) => {
    setId(student.studentId);
    setName(student.studentName);
    setStandard(student.standard);
  };

  // Update student.
  const updateStudent = async () => {
    try {
      await axios.put(`https://localhost:7139/api/Student/id`, { studentId,studentName, standard });
      const updatedStudents = students.map((student) =>
        student.studentId === studentId ? { ...student, studentName, standard } : student
      );

      // Set the student and clear the form.
      setStudents(updatedStudents);
      clearForm();
    } catch (error) {
      console.error(error);

      // Set the error message.
      let e = error?.response?.data;
      setError( e.title ?  e.title : e );
    }
  };

  // Set the default value for the details.
  const clearForm = () => {
    setId(null);
    setName('');
    setStandard(null);
  };

  // Handles the submit of the form.
  const handleSubmit = (e) => {
    if (studentId) {
      updateStudent();
    } else {
      addStudent();
    }
  };

  return (
    <div>
      <h1>Students</h1>
      { error ? <h4>{error}</h4> :
      <div>
        <StudentForm
          Submit={handleSubmit}
          id={studentId}
          name={studentName}
          standard={standard}
          setName={setName}
          setStandard={setStandard}
        />
        <StudentList students={students} onEdit={editStudent} />
      </div>
      }
    </div>
  );
};

export default Student;