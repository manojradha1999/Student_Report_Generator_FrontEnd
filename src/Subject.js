import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectForm from './SubjectForm';
import SubjectList from './SubjectList';

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setId] = useState(0);
  const [subjectName, setName] = useState('');
  const [marks, setmark] = useState(0);
  const[studentId, setStudentId] = useState(0);
  const [error, setError] = useState('');
  

  // For intial fetch of subject details.
  useEffect(() => {
    fetchSubjects();
  }, []);

  // To fetch the subjects.
  const fetchSubjects = async () => {
    try {
      const response = await axios.get('https://localhost:7139/api/Subject');
      setSubjects(response.data);
    } catch (error) {

    // Set the error message.
      console.error( error);
      let e = error?.response?.data;
      setError( e.title ?  e.title : e );
    }
  };

  // Add the subjects.
  const addSubject = async () => {
    try {
      const response = await axios.post('https://localhost:7139/api/Subject', { subjectName, marks, studentId });
      setSubjects([...subjects, response.data]);

      // Clears the form and fetch the details with updated list.
      clearForm();
      fetchSubjects();
    } catch (error) {
      console.error(error);

      // Set the error message.
      let e = error?.response?.data;
      setError( e.title ?  e.title : e );
    }
  };

  // Update the subject details by setting them.
  const editSubject = (subject) => {
    setId(subject.subjectId);
    setStudentId(subject.studentId);
    setName(subject.subjectName);
    setmark(subject.marks);
  };

  // Update the subject call.
  const updateSubject = async () => {
    try {
      await axios.put(`https://localhost:7139/api/Subject/id`, { subjectId, subjectName, marks, studentId });
      const updatedSubjects = subjects.map((subject) =>
      subject.subjectId === subjectId ? { ...subject, subjectId, subjectName, marks, studentId } : subject
      );

      // Set the updated subject and clear the form and fetch the updated details.
      setSubjects(updatedSubjects);
      clearForm();
      fetchSubjects();
    } catch (error) {
      console.error(error);

      // Set the error message.
      let e = error?.response?.data;
      setError( e.title ?  e.title : e );
    }
  };

  // Set the default value on clear form.
  const clearForm = () => {
    setId(null);
    setStudentId(null);
    setName('');
    setmark(null);
    setError('');
  };

  // Handles the form submit.
  const handleSubmit = (e) => {
    if (subjectId) {
      updateSubject();
    } else {
      addSubject();
    }
  };

  return (
    <div>
      <h1>Students</h1>
        <SubjectForm
            Submit={handleSubmit}
            id={subjectId}
            name={subjectName}
            marks={marks}
            studentId={studentId}
            setName={setName}
            setmark={setmark}
            setStudentId={setStudentId}
        />
        {error ? <h4>{error}!!!</h4> : <SubjectList subjects={subjects} onEdit={editSubject} />}
    </div>
  );
};

export default Subject;