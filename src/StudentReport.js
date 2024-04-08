import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function StudentReport(){
    const [students, setStudents] = useState({});
    const [StdId, setStdId] = useState("");
    const [name,setname] = useState("");
    const [error, setError] = useState("");

    // Fetch the student report details.
    const fetchStudent = async (id,name) => {
        try {
          const response = await axios.get(`https://localhost:7139/api/Report/${id}/${name}` );

          if(response?.data){
            setError("");
            setStudents(response?.data);
            setStdId("");
            setname("");
          }
        } catch (error) {
          console.error( error);

          // Set empty object if error occured and set the error message.
          setStudents({});
          let e = error?.response?.data;
          setError( e?.title ?  e.title : e );
        }
    };

    // Handles the change event on the input field.
    const handleChange = (e) => {
        let inputValue = e.target.value;

        // Condition check for input value length and it should be number.
        if(inputValue.length > 0 && inputValue.length < 3 && inputValue < 13 && !isNaN(inputValue) && inputValue > 0){
            setStdId(inputValue);
        } else {

            // Set empty string if condition fails.
            setStdId("");
        }
    };

    // Handles the change event on the input field.
    const handlenameChange = (e) => {
        let inputValue = e.target.value;

        // Condition check for input value length and it should be number.
        if(inputValue.length > 0 && inputValue.length < 20 ){
            setname(inputValue);
        } else {

            // Set empty string if condition fails.
            setname("");
        }
    };

    return(
        <div>
            <input type="text"
            placeholder="Name"
            value={name}
            onChange={handlenameChange}></input>
            <input type="number"
            placeholder="Standard"
            value={StdId}
            onChange={handleChange}></input>
            <button onClick={()=> fetchStudent(StdId,name)}>Search</button>
            { students.studentId ?
            <div>
                <h1>Student Report!</h1>
                <ul>
                    <h3>{students.studentName}</h3> 
                    {students.studentReport.map((student,index) => (
                        <li  className="sample" key={index}>
                            StudentId: {student.studentId}<br/>
                            Subject: {student.subjectName}<br/>
                            Mark: {student.mark}<br/>
                            Result: {student.result}<br/>
                        </li>
                    ))}
                    <h3>Total: {students.total}</h3>
                </ul>
            </div>
            :
            <></>}
            { error ? 
            <div>
                <h2>{error}</h2>
            </div>
            : <></>
            }
        </div>
    );
}

export default StudentReport;